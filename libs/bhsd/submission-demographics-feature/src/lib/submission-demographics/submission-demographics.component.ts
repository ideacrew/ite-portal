import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

import {
  convertExtractToDemographics,
  ExtractSubmissionDemographics,
  BHSDService,
} from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-submission-demographics',
  templateUrl: './submission-demographics.component.html',
  styleUrls: ['./submission-demographics.component.scss'],
})
export class SubmissionDemographicsComponent {
  submission$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.bhsdService.getExtractSubmission(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  submissionDemographicBreakdown$: Observable<ExtractSubmissionDemographics> =
    this.submission$.pipe(
      map((submission) => convertExtractToDemographics(submission))
    );

  constructor(
    private route: ActivatedRoute,
    private bhsdService: BHSDService
  ) {}
}
