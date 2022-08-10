/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastDayOfMonth } from 'date-fns';
import { tap, finalize } from 'rxjs/operators';

import {
  dateNotInFuture,
  coveragePeriodNotTooLong,
  startDateNotAfterEndDate,
  extractDateWithinCoveragePeriod,
} from '../date-validator';

export interface ExtractTransmissionForm {
  provider_gateway_identifier: FormControl<string | null>;
  coverage_start: FormControl<string | null>;
  coverage_end: FormControl<string | null>;
  extracted_on: FormControl<string | null>;
  record_group: FormControl<RecordGroup | null>;
  records: FormControl<Record<string, unknown>[] | null>;
  file_type: FormControl<string | null>;
  file_name: FormControl<string | null>;
}

type RecordGroup = 'admission' | 'discharge' | 'active';

@Component({
  templateUrl: './submit-extract.component.html',
  styleUrls: ['./submit-extract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitExtractComponent {
  title = 'ite-portal';
  debug = false;
  sendingData = false;

  extractForm!: FormGroup<ExtractTransmissionForm>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    const thisMonth = new Date().getMonth();
    const lastMonth = thisMonth - 1;

    // Get first and last day of last month
    const lastMonthStart = new Date(new Date().getFullYear(), lastMonth, 1);
    const lastMonthEnd = lastDayOfMonth(lastMonthStart);

    this.extractForm = this.fb.group(
      {
        provider_gateway_identifier: this.fb.control('73982', [
          Validators.required,
        ]),
        coverage_start: this.fb.control(
          lastMonthStart.toISOString().slice(0, 10), // 2022-10-01
          [Validators.required, dateNotInFuture]
        ),
        coverage_end: this.fb.control(lastMonthEnd.toISOString().slice(0, 10), [
          Validators.required,
          dateNotInFuture,
        ]),
        extracted_on: this.fb.control('', [
          Validators.required,
          dateNotInFuture,
        ]),
        record_group: this.fb.control<RecordGroup | null>(null, [
          Validators.required,
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
      this.http
        .post(
          // Url to post to
          'https://ite-api.herokuapp.com/api/v1/extracts/ingest',

          // body of the payload, here sending the entire form value
          this.extractForm.value
        )
        .pipe(
          tap(() => (this.sendingData = true)),
          finalize(() => {
            this.sendingData = false;
            this.extractForm.reset();
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

  get record_group(): FormControl<RecordGroup | null> {
    return this.extractForm.get(
      'record_group'
    ) as FormControl<RecordGroup | null>;
  }

  get records(): FormControl<Record<string, unknown>[] | null> {
    return this.extractForm.get('records') as FormControl<
      Record<string, unknown>[] | null
    >;
  }
}
