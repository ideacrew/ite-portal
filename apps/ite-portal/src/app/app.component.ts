import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { mockData } from './data';

export interface Transaction {
  _id: {
    $oid: string;
  };
  created_at: string;
  extract_type: 'Admission' | 'Discharge' | 'Update';
  failures: unknown;
  payload: unknown;
  provider_identifier: 'testing_db_connection';
}

@Component({
  selector: 'dbh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ite-portal';

  constructor(private http: HttpClient) {}

  data$!: Observable<unknown>;

  getData() {
    this.data$ = this.http
      .get('https://ite-api.herokuapp.com/api/v1/extracts')
      .pipe(catchError(() => of(mockData)));
  }

  sendData(): void {
    this.http
      .post('https://ite-api.herokuapp.com/api/v1/extracts/ingest', {
        provider_gateway_identifier: '73982',
        coverage_start: '2022-06-01',
        coverage_end: '2022-06-30',
        extracted_on: '2022-07-22',
        transaction_group: 'discharge',
        file_type: 'Initial',
      })
      .subscribe();
  }
}
