import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { ConfigService } from '../config.service';
import { convertExtractSubmissionToV2 } from '../get-issues-by-data.v2';
import {
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
} from '../models';
import {
  ProviderProfile,
  ProviderProfileService,
} from '../provider-profile.service';

@Component({
  selector: 'dbh-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss'],
})
export class SubmissionDetailComponent {
  submission$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.http.get<ExtractSubmissionResponse>(
        `${this.config.baseApiUrl}/api/v1/extracts/${id ?? 'fake-value'}`
      )
    ),
    shareReplay(1)
  );

  submissionV2$: Observable<ExtractSubmissionResponseV2> =
    this.submission$.pipe(
      map((submission) => convertExtractSubmissionToV2(submission))
    );

  providerName$: Observable<string | undefined> =
    this.providerProfile.currentProvider$.pipe(
      map((provider: ProviderProfile | undefined) => provider?.provider_name)
    );

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private config: ConfigService,
    private providerProfile: ProviderProfileService
  ) {}
}
