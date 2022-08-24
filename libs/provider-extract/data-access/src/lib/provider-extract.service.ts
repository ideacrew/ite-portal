import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
import { ExtractSubmission, ExtractSubmissionResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProviderExtractService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  sendData(formValue: unknown): Observable<unknown> {
    return this.http.post(
      // Url to post to
      `${this.config.baseApiUrl}/api/v1/extracts/ingest`,
      // body of the payload, here sending the entire form value
      formValue
    );
  }

  getSubmissions(): Observable<ExtractSubmission[]> {
    return this.http
      .get<ExtractSubmission[]>(`${this.config.baseApiUrl}/api/v1/extracts`)
      .pipe(map((extracts) => extracts.slice(0, 10)));
  }

  getExtractSubmission(id: string): Observable<ExtractSubmissionResponse> {
    return this.http.get<ExtractSubmissionResponse>(
      `${this.config.baseApiUrl}/api/v1/extracts/${id}`
    );
  }
}
