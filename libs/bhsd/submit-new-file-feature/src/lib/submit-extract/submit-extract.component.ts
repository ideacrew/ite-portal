/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/unbound-method */
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
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { lastDayOfMonth } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';

import { BHSDService, ExtractRecordData } from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';
import {
  BHSDSubmissionForm,
  coveragePeriodNotTooLong,
  dateNotInFuture,
  extractDateWithinCoveragePeriod,
  startDateNotAfterEndDate,
} from '@dbh/bhsd/ui';
import { convertCsvToJson } from '@dbh/bhsd/util';

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
  resultsMessage = false;
  errorMessage: undefined | string = undefined;
  largeFileWarning = false;

  extractForm!: FormGroup<BHSDSubmissionForm>;

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
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private bhsdService: BHSDService,
    private authService: AuthService
  ) {
    this.extractForm = this.fb.group(
      {
        provider_gateway_identifier: this.fb.control(
          this.authService.providerGatewayId ?? '000',
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
        records: this.fb.control<ExtractRecordData[] | null>(null, [
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

  resetMessages(): void {
    this.sendingData.next(false);
    this.resultsMessage = false;
    this.errorMessage = undefined;
    this.largeFileWarning = false;
    this.cdr.detectChanges();
  }

  sendData(): void {
    if (this.extractForm.status === 'VALID') {
      this.sendingData.next(true);
      this.result.next(null);
      this.bhsdService.sendData(this.extractForm.value).subscribe({
        next: () => {
          this.sendingData.next(false);
          this.resultsMessage = true;
          this.errorMessage = undefined;
          setTimeout(() => {
            this.resultsMessage = false;
            this.largeFileWarning = false;
            this.cdr.detectChanges();
          }, 10_000);
          this.extractForm.reset({
            provider_gateway_identifier:
              this.authService.providerGatewayId ?? '000',
            coverage_start: this.lastMonthStart.toISOString().slice(0, 10),
            coverage_end: this.lastMonthEnd.toISOString().slice(0, 10),
            extracted_on: '',
          });
          if (this.fileInput.nativeElement) {
            this.fileInput.nativeElement.value = '';
          }
        },
        error: (error: HttpErrorResponse) => {
          this.resultsMessage = false;
          this.largeFileWarning = false;
          this.sendingData.next(false);
          this.errorMessage = error.message;
          this.cdr.detectChanges();
        },
      });
    }
  }

  fileSelected(files: FileList | null): void {
    if (files) {
      this.records.setValue(null);
      const file: File | null = files.item(0);
      if (file) {
        this.extractForm.controls['file_type'].setValue(file.type);
        const reader = new FileReader();
        const fileName = file.name;
        reader.readAsText(file);
        reader.addEventListener('load', () => {
          const csvText = reader.result as string;
          const recordData: ExtractRecordData[] = convertCsvToJson(csvText);
          // Sheets uses a return and newline for each new row
          if (recordData.length > 0) {
            this.extractForm.patchValue({
              records: recordData,
              file_name: fileName,
            });
            this.largeFileWarning = recordData.length >= 1000 ? true : false;
            this.cdr.detectChanges();
          } else {
            this.largeFileWarning = false;
            this.records.setErrors({ notValidCsv: true });
            this.cdr.detectChanges();
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

  get records(): FormControl<Array<Record<string, unknown>> | null> {
    return this.extractForm.get('records') as FormControl<Array<
      Record<string, unknown>
    > | null>;
  }
}
