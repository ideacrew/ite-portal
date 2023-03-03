/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, filter } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
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
    coverageStart,
    coverageEnd,
    submissionStart,
    submissionEnd,
    provider,
    trSelector,
    trValue,
    prSelector,
    prValue,
  }: {
    offset?: string;
    coverageStart?: string;
    coverageEnd?: string;
    submissionStart?: string;
    submissionEnd?: string;
    provider?: string;
    trSelector?: string;
    trValue?: string;
    prSelector?: string;
    prValue?: string;
  }): Observable<Extracts> {
    let baseUrl = `${this.config.baseApiUrl}/api/v1/extracts?`;
    const urlParameters = [];
    if (coverageStart && coverageStart !== '') {
      urlParameters.push(`coverage_start=${coverageStart}`);
    }
    if (coverageEnd && coverageEnd !== '') {
      urlParameters.push(`coverage_end=${coverageEnd}`);
    }
    if (submissionStart && submissionStart !== '') {
      urlParameters.push(`submission_start=${submissionStart}`);
    }
    if (submissionEnd && submissionEnd !== '') {
      urlParameters.push(`submission_end=${submissionEnd}`);
    }
    if (provider && provider !== '') {
      urlParameters.push(`provider=${provider}`);
    }
    if (offset && offset !== '') {
      urlParameters.push(`offset=${offset}`);
    }
    if (trSelector && trSelector !== '') {
      urlParameters.push(`tr_selector=${trSelector}`);
    }
    if (trValue && trValue !== '') {
      urlParameters.push(`tr_value=${trValue}`);
    }
    if (prSelector && prSelector !== '') {
      urlParameters.push(`pr_selector=${prSelector}`);
    }
    if (prValue && prValue !== '') {
      urlParameters.push(`pr_value=${prValue}`);
    }
    baseUrl += urlParameters.join('&');
    return this.http.get<Extracts>(baseUrl).pipe(map((extract) => extract));
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

  getFilteredSubmissionStatus({
    status,
    month,
    year,
    trMax,
    trMin,
    prMax,
    prMin,
    serviceType,
    provider,
    submissionStart,
    submissionEnd,
  }: {
    status?: string;
    month?: string;
    year?: string;
    trMin?: string;
    trMax?: string;
    prMin?: string;
    prMax?: string;
    serviceType?: string;
    provider?: string;
    submissionStart?: string;
    submissionEnd?: string;
  }): Observable<SubmissionStatus[]> {
    let baseUrl = `${this.config.baseApiUrl}/api/v1/providers/submission_summary?`;
    const urlParameters = [];
    if (status && status !== '') {
      urlParameters.push(`status=${status}`);
    }
    if (month && month !== '') {
      urlParameters.push(`month=${month}`);
    }
    if (year && year !== '') {
      urlParameters.push(`year=${year}`);
    }
    if (trMin && trMin !== '') {
      urlParameters.push(`tr_min=${trMin}`);
    }
    if (trMax && trMax !== '') {
      urlParameters.push(`tr_max=${trMax}`);
    }
    if (prMin && prMin !== '') {
      urlParameters.push(`pr_min=${prMin}`);
    }
    if (prMax && prMax !== '') {
      urlParameters.push(`pr_max=${prMax}`);
    }
    if (serviceType && serviceType !== '') {
      urlParameters.push(`service_type=${serviceType}`);
    }
    if (provider && provider !== '') {
      urlParameters.push(`provider=${provider}`);
    }
    if (submissionStart && submissionStart !== '') {
      urlParameters.push(`submission_start=${submissionStart}`);
    }
    if (submissionEnd && submissionEnd !== '') {
      urlParameters.push(`submission_end=${submissionEnd}`);
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
