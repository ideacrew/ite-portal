import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

import {
  ExtractSubmissionResponseV2,
  ProviderExtractService,
} from '@dbh/provider-extract/data-access';

import {
  ProviderProfile,
  ProviderProfileService,
} from '../provider-profile.service';
import { convertExtractSubmissionToV2 } from '@dbh/provider-extract/util';

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
      this.providerExtractService.getExtractSubmission(id ?? 'fake-value')
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
    private providerExtractService: ProviderExtractService,
    private providerProfile: ProviderProfileService
  ) {}
}
