/* eslint-disable @typescript-eslint/unbound-method */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { mockData } from './data';

// interface ExtractTransmissionForm {
//   provider_gateway_identifier: '73982';
//   coverage_start: string;
//   coverage_end: string;
//   extracted_on: string;
//   transaction_group: 'admission' | 'discharge' | null;
//   file_type: 'Initial';
// }

@Component({
  selector: 'dbh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ite-portal';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  data$!: Observable<unknown>;

  extractForm: FormGroup = this.fb.group({
    provider_gateway_identifier: ['73982', Validators.required],
    coverage_start: ['', Validators.required],
    coverage_end: ['', Validators.required],
    extracted_on: ['', Validators.required],
    // eslint-disable-next-line unicorn/no-null
    transaction_group: [null, Validators.required],
    file_type: ['Initial', Validators.required],
  });

  getData() {
    this.data$ = this.http
      .get('https://ite-api.herokuapp.com/api/v1/extracts')
      .pipe(catchError(() => of(mockData)));
  }

  sendData(): void {
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
