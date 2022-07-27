/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { lastDayOfMonth } from 'date-fns';

import {
  dateNotInFuture,
  coveragePeriodNotTooLong,
  startDateNotAfterEndDate,
  extractDateWithinCoveragePeriod,
} from './date-validator';

export interface ExtractTransmissionForm {
  provider_gateway_identifier: FormControl<string | null>;
  coverage_start: FormControl<string | null>;
  coverage_end: FormControl<string | null>;
  extracted_on: FormControl<string | null>;
  transaction_group: FormControl<TransactionGroup | null>;
  transactions: FormControl<Record<string, unknown>[] | null>;
  file_type: FormControl<string | null>;
}

type TransactionGroup = 'admission' | 'discharge' | 'update';

@Component({
  selector: 'dbh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ite-portal';
  debug = false;

  extractForm!: FormGroup<ExtractTransmissionForm>;

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
        transaction_group: this.fb.control<TransactionGroup | null>(null, [
          Validators.required,
        ]),
        transactions: this.fb.control<Record<string, unknown>[] | null>(null, [
          Validators.required,
        ]),
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
        .subscribe();
    }
  }

  fileSelected(files: FileList | null): void {
    if (files) {
      this.transactions.setValue(null);
      const csvAsObject: Array<Record<string, unknown>> = [];

      const file: File | null = files.item(0);
      if (file) {
        const reader = new FileReader();
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

            this.extractForm.patchValue({ transactions: csvAsObject });
          } else {
            this.transactions.setErrors({ notValidCsv: true });
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

  get transaction_group(): FormControl<TransactionGroup | null> {
    return this.extractForm.get(
      'transaction_group'
    ) as FormControl<TransactionGroup | null>;
  }

  get transactions(): FormControl<Record<string, unknown>[] | null> {
    return this.extractForm.get('transactions') as FormControl<
      Record<string, unknown>[] | null
    >;
  }
}
