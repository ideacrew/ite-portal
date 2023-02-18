import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, filter } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
import {
  Extracts,
  ExtractSubmission,
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
  SubmissionStatus,
  SubmissionSummary,
  FailingDataField,
} from './models';
import { convertExtractSubmissionToV2 } from './util';
import { convertSummaryToStatus } from './util/convert-summary-to-status';

@Injectable({
  providedIn: 'root',
})
export class BHSDService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  sendData(formValue: unknown): Observable<unknown> {
    return this.http.post(
      // Url to post to
      `${this.config.baseApiUrl}/api/v1/extracts/ingest`,
      // body of the payload, here sending the entire form value
      formValue
    );
  }

  getSubmissions(): Observable<Extracts> {
    return this.http
      .get<Extracts>(`${this.config.baseApiUrl}/api/v1/extracts`)
      .pipe(map((extract) => extract));
  }

  getSubmissionsWithParams({
    offset,
  }: {
    offset: string;
  }): Observable<Extracts> {
    return this.http
      .get<Extracts>(
        `${this.config.baseApiUrl}/api/v1/extracts?offset=${offset}`
      )
      .pipe(map((extract) => extract));
  }

  getSubmissionStatusByDate({
    month,
    year,
  }: {
    month: number;
    year: number;
  }): Observable<SubmissionStatus[]> {
    const updateMonth = (month += 1);
    return this.http
      .get<SubmissionSummary[]>(
        `${this.config.baseApiUrl}/api/v1/providers/submission_summary?month=${updateMonth}&year=${year}`
      )
      .pipe(
        map((summary) =>
          summary.map((status) => convertSummaryToStatus(status))
        )
      );
  }

  getSubmissionStatus(): Observable<SubmissionStatus[]> {
    return this.http
      .get<SubmissionSummary[]>(
        `${this.config.baseApiUrl}/api/v1/providers/submission_summary`
      )
      .pipe(
        map((summary) =>
          summary.map((status) => convertSummaryToStatus(status))
        )
      );
  }

  getExtractSubmission(id: string): Observable<ExtractSubmissionResponse> {
    return this.http.get<ExtractSubmissionResponse>(
      `${this.config.baseApiUrl}/api/v1/extracts/${id}`
    );
  }

  getExtractSubmissionV2(id: string): Observable<ExtractSubmissionResponseV2> {
    return this.http
      .get<ExtractSubmissionResponse>(
        `${this.config.baseApiUrl}/api/v1/extracts/${id}`
      )
      .pipe(map((submission) => convertExtractSubmissionToV2(submission)));
  }

  getExtractFailingDataFields(id: string): Observable<FailingDataField[]> {
    return this.http
      .get<FailingDataField[]>(
        `${this.config.baseApiUrl}/api/v1/extracts/failing_data_fields?id=${id}`
      )
      .pipe(filter((extract: FailingDataField[]) => Array.isArray(extract)));
  }
}
