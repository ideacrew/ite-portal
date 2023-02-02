import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ExtractSubmissionResponseV2 } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

import { SubmissionStore } from '../store/submission.store';

@Component({
  selector: 'dbh-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss'],
  providers: [SubmissionStore],
})
export class SubmissionDetailComponent {
  submissionStore = inject(SubmissionStore);

  viewType: 'record' | 'dataField' = 'record';

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  submission$ = this.submissionStore.submission$;

  submissionV2$: Observable<ExtractSubmissionResponseV2> =
    this.submissionStore.submissionV2$;
}
