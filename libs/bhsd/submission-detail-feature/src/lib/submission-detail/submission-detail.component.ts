import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

import {
  convertExtractSubmissionToV2,
  ExtractSubmissionResponseV2,
  BHSDService,
} from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';
import { BhsdFacade } from '@dbh/bhsd/store';

@Component({
  selector: 'dbh-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss'],
})
export class SubmissionDetailComponent implements OnInit {
  bhsdFacade = inject(BhsdFacade);

  loaded$ = this.bhsdFacade.loaded$;

  viewType: 'record' | 'dataField' = 'record';

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  submission$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.bhsdService.getExtractSubmission(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  submissionV2$: Observable<ExtractSubmissionResponseV2> =
    this.submission$.pipe(
      map((submission) => convertExtractSubmissionToV2(submission))
    );

  constructor(
    private route: ActivatedRoute,
    private bhsdService: BHSDService
  ) {}

  ngOnInit(): void {
    this.bhsdFacade.init();
  }
}
