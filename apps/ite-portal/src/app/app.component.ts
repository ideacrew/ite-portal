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
import { catchError, Observable, of } from 'rxjs';
import { mockData } from './data';

interface ExtractTransmissionForm {
  provider_gateway_identifier: FormControl<string | null>;
  coverage_start: FormControl<string | null>;
  coverage_end: FormControl<string | null>;
  extracted_on: FormControl<string | null>;
  transaction_group: FormControl<TransactionGroup | null>;
  file_type: FormControl<string | null>;
}

type TransactionGroup = 'admission' | 'discharge';

@Component({
  selector: 'dbh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ite-portal';
  debug = true;

  data$!: Observable<unknown>;

  extractForm!: FormGroup<ExtractTransmissionForm>;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.extractForm = this.fb.group({
      provider_gateway_identifier: this.fb.control('73982', [
        Validators.required,
      ]),
      coverage_start: this.fb.control<string>('', [Validators.required]),
      coverage_end: this.fb.control<string>('', [Validators.required]),
      extracted_on: this.fb.control<string>('', [Validators.required]),
      transaction_group: this.fb.control<TransactionGroup | null>(null, [
        Validators.required,
      ]),
      file_type: this.fb.control('Initial', [Validators.required]),
    });
  }

  getData() {
    this.data$ = this.http
      .get('https://ite-api.herokuapp.com/api/v1/extracts')
      .pipe(catchError(() => of(mockData)));
  }

  sendData(): void {
    if (this.extractForm.status === 'VALID')
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
