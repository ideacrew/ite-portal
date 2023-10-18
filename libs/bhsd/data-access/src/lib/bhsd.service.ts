/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, filter } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
import { Criterion, ValueOption } from '@dbh/claims/data-access/models';
import {
  Extracts,
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
      `${this.config.gatewayApiUrl}/api/v1/extracts/ingest`,
      // body of the payload, here sending the entire form value
      formValue
    );
  }

  getSubmissions(): Observable<Extracts> {
    return this.http
      .get<Extracts>(`${this.config.gatewayApiUrl}/api/v1/extracts`)
      .pipe(map((extract) => extract));
  }

  getSubmissionsWithCriteria(
    criteria: Criterion[],
    offset: string,
    sort?: string,
    sortDirection?: 'asc' | 'desc'
  ): Observable<Extracts> {
    let baseUrl = `${this.config.gatewayApiUrl}/api/v1/extracts?offset=${offset}&`;
    for (const [index, criterion] of criteria.entries()) {
      baseUrl += `criteria_selector[${index}]=${criterion.selector ?? ''}&`;
      baseUrl += `criteria_relative[${index}]=${criterion.relative ?? ''}&`;
      baseUrl += `criteria_value[${index}]=${criterion.value ?? ''}&`;
      baseUrl += `criteria_value_type[${index}]=${criterion.valueType ?? ''}&`;
    }
    if (sort && sort !== '') {
      baseUrl += `sort=${sort}&`;
    }
    if (sortDirection) {
      baseUrl += `sort_direction=${sortDirection}&`;
    }
    return this.http.get<Extracts>(baseUrl).pipe(map((extract) => extract));
  }

  getProviders(): Observable<ValueOption[]> {
    return this.http.get<ValueOption[]>(
      `${this.config.gatewayApiUrl}/api/v1/providers`
    );
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
        `${this.config.gatewayApiUrl}/api/v1/providers/submission_summary?month=${updateMonth}&year=${year}`
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
        `${this.config.gatewayApiUrl}/api/v1/providers/submission_summary`
      )
      .pipe(
        map((summary) =>
          summary.map((status) => convertSummaryToStatus(status))
        )
      );
  }

  getSubmissionStatusWithCriteria(
    criteria: Criterion[],
    month: number,
    year: number,
    sort?: string,
    sortDirection?: string
  ): Observable<SubmissionStatus[]> {
    let baseUrl = `${this.config.gatewayApiUrl}/api/v1/providers/submission_summary?month=${month}&year=${year}&`;
    for (const [index, criterion] of criteria.entries()) {
      baseUrl += `criteria_selector[${index}]=${criterion.selector ?? ''}&`;
      baseUrl += `criteria_relative[${index}]=${criterion.relative ?? ''}&`;
      baseUrl += `criteria_value[${index}]=${criterion.value ?? ''}&`;
      baseUrl += `criteria_value_type[${index}]=${criterion.valueType ?? ''}&`;
    }
    if (sort && sort !== '') {
      baseUrl += `sort=${sort}&`;
    }
    if (sortDirection) {
      baseUrl += `sort_direction=${sortDirection}&`;
    }
    return this.http
      .get<SubmissionSummary[]>(baseUrl)
      .pipe(
        map((summary) =>
          summary.map((status) => convertSummaryToStatus(status))
        )
      );
  }

  getFilteredSubmissionStatus({
    status,
    month,
    year,
    sort,
    sortDirection,
  }: {
    status?: string;
    month?: string;
    year?: string;
    sortDirection?: 'asc' | 'desc';
    sort?: string;
  }): Observable<SubmissionStatus[]> {
    let baseUrl = `${this.config.gatewayApiUrl}/api/v1/providers/submission_summary?`;
    const urlParameters = [];
    if (status && status !== '') {
      urlParameters.push(`filter_status=${status}`);
    }
    if (month && month !== '') {
      urlParameters.push(`month=${month}`);
    }
    if (year && year !== '') {
      urlParameters.push(`year=${year}`);
    }
    if (sort && sort !== '') {
      urlParameters.push(`sort=${sort}`);
    }
    if (sortDirection) {
      urlParameters.push(`sort_direction=${sortDirection}`);
    }
    baseUrl += urlParameters.join('&');
    return this.http
      .get<SubmissionSummary[]>(baseUrl)
      .pipe(
        map((summary) =>
          summary.map((statusSummary) => convertSummaryToStatus(statusSummary))
        )
      );
  }

  getExtractSubmission(id: string): Observable<ExtractSubmissionResponse> {
    return this.http.get<ExtractSubmissionResponse>(
      `${this.config.gatewayApiUrl}/api/v1/extracts/${id}`
    );
  }

  getExtractSubmissionV2(id: string): Observable<ExtractSubmissionResponseV2> {
    return this.http
      .get<ExtractSubmissionResponse>(
        `${this.config.gatewayApiUrl}/api/v1/extracts/${id}`
      )
      .pipe(map((submission) => convertExtractSubmissionToV2(submission)));
  }

  getExtractFailingDataFields(id: string): Observable<FailingDataField[]> {
    return this.http
      .get<FailingDataField[]>(
        `${this.config.gatewayApiUrl}/api/v1/extracts/failing_data_fields?id=${id}`
      )
      .pipe(filter((extract: FailingDataField[]) => Array.isArray(extract)));
  }
}
