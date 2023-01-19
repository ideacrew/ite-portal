import { Component } from '@angular/core';

import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  submissionStatus$ = this.bhsdService.getSubmissionStatus();
  constructor(private bhsdService: BHSDService) {}

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  serviceType(submission: SubmissionStatus): string {
    const { mh, sud } = submission;

    if (mh && sud) {
      return 'MH & SUD';
    }

    if (mh && !sud) {
      return 'MH';
    }

    if (!mh && sud) {
      return 'SUD';
    }

    return '';
  }
}
