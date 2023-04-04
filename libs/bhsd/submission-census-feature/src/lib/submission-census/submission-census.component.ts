import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

import {
  convertExtractToCensus,
  ExtractSubmissionCensusBreakdown,
  BHSDService,
} from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-submission-census',
  templateUrl: './submission-census.component.html',
  styleUrls: ['./submission-census.component.scss'],
})
export class SubmissionCensusComponent {
  submission$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.bhsdService.getExtractSubmission(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  submissionCensusBreakdown$: Observable<ExtractSubmissionCensusBreakdown> =
    this.submission$.pipe(
      map((submission) => convertExtractToCensus(submission))
    );

  constructor(
    private route: ActivatedRoute,
    private bhsdService: BHSDService
  ) {}
}
