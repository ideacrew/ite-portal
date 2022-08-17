/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastDayOfMonth } from 'date-fns';
import { BehaviorSubject, EMPTY, of, Subject } from 'rxjs';
import { finalize, catchError, shareReplay } from 'rxjs/operators';
import { ConfigService } from '../config.service';

import {
  dateNotInFuture,
  coveragePeriodNotTooLong,
  startDateNotAfterEndDate,
  extractDateWithinCoveragePeriod,
} from '../date-validator';
import { ProviderProfileService } from '../provider-profile.service';

export interface ExtractTransmissionForm {
  provider_gateway_identifier: FormControl<string | null>;
  coverage_start: FormControl<string | null>;
  coverage_end: FormControl<string | null>;
  extracted_on: FormControl<string | null>;
  records: FormControl<Record<string, unknown>[] | null>;
  file_type: FormControl<string | null>;
  file_name: FormControl<string | null>;
}

@Component({
  templateUrl: './submit-extract.component.html',
  styleUrls: ['./submit-extract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitExtractComponent {
  title = 'ite-portal';
  debug = false;
  sendingData = new BehaviorSubject(false);
  sendingData$ = this.sendingData.asObservable().pipe(shareReplay(1));
  result = new Subject<string | null>();
  result$ = this.result.asObservable();

  extractForm!: FormGroup<ExtractTransmissionForm>;

  get lastMonthStart(): Date {
    const thisMonth = new Date().getMonth();

    const lastMonth = thisMonth - 1;

    return new Date(new Date().getFullYear(), lastMonth, 1);
  }

  get lastMonthEnd(): Date {
    return lastDayOfMonth(this.lastMonthStart);
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private config: ConfigService,
    private providerProfile: ProviderProfileService
  ) {
    this.extractForm = this.fb.group(
      {
        provider_gateway_identifier: this.fb.control(
          this.providerProfile.currentProvider.value
            ?.provider_gateway_identifier ?? '000',
          [Validators.required]
        ),
        coverage_start: this.fb.control(
          this.lastMonthStart.toISOString().slice(0, 10), // 2022-10-01
          [Validators.required, dateNotInFuture]
        ),
        coverage_end: this.fb.control(
          this.lastMonthEnd.toISOString().slice(0, 10),
          [Validators.required, dateNotInFuture]
        ),
        extracted_on: this.fb.control('', [
          Validators.required,
          dateNotInFuture,
        ]),
        records: this.fb.control<Record<string, unknown>[] | null>(null, [
          Validators.required,
        ]),
        file_name: this.fb.control(''),
        file_type: this.fb.control('Initial', [Validators.required]),
      },
      {
        validators: [
          startDateNotAfterEndDate,
          coveragePeriodNotTooLong,
          extractDateWithinCoveragePeriod,
        ],
      }
    );
  }

  sendData(): void {
    if (this.extractForm.status === 'VALID') {
      this.sendingData.next(true);
      this.result.next(null);
      this.http
        .post(
          // Url to post to
          `${this.config.baseApiUrl}/api/v1/extracts/ingest`,
          // body of the payload, here sending the entire form value
          this.extractForm.value
        )
        .pipe(
          finalize(() => {
            this.sendingData.next(false);
            this.result.next('File submitted successfully');
            this.extractForm.reset({
              provider_gateway_identifier:
                this.providerProfile.currentProvider.value
                  ?.provider_gateway_identifier ?? '000',
              coverage_start: this.lastMonthStart.toISOString().slice(0, 10),
              coverage_end: this.lastMonthEnd.toISOString().slice(0, 10),
              extracted_on: '',
            });
            if (this.fileInput.nativeElement) {
              this.fileInput.nativeElement.value = '';
            }
          }),
          catchError((error: unknown) => {
            console.log('catchError', { error });
            this.result.next('Error submitting file');
            return of(EMPTY);
          })
        )
        .subscribe();
    }
  }

  fileSelected(files: FileList | null): void {
    if (files) {
      this.records.setValue(null);
      const csvAsObject: Array<Record<string, unknown>> = [];
      const file: File | null = files.item(0);
      if (file) {
        const reader = new FileReader();
        const fileName = file.name;
        reader.readAsText(file);
        reader.addEventListener('load', () => {
          const csvText = reader.result as string;

          // Sheets uses a return and newline for each new row
          const [rawHeaders, ...rawLines] = csvText.split('\r\n');
          if (rawLines.length > 0) {
            const headers = rawHeaders.split(',');

            for (const line of rawLines) {
              const record: Record<string, unknown> = {};
              const currentLine = line.split(',');

              for (const header of headers) {
                record[header] = currentLine[headers.indexOf(header)];
              }

              csvAsObject.push(record);
            }
            this.extractForm.patchValue({
              records: csvAsObject,
              file_name: fileName,
            });
            this.cdr.detectChanges();
          } else {
            this.records.setErrors({ notValidCsv: true });
          }
        });
      }
    }
  }

  // These are helper methods to get at the FormControl object in the template
  get coverage_start(): FormControl<string | null> {
    return this.extractForm.get('coverage_start') as FormControl<string | null>;
  }

  get coverage_end(): FormControl<string | null> {
    return this.extractForm.get('coverage_end') as FormControl<string | null>;
  }

  get extracted_on(): FormControl<string | null> {
    return this.extractForm.get('extracted_on') as FormControl<string | null>;
  }

  get records(): FormControl<Record<string, unknown>[] | null> {
    return this.extractForm.get('records') as FormControl<
      Record<string, unknown>[] | null
    >;
  }
}
