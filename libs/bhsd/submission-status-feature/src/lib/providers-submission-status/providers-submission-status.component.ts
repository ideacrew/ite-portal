import { Component } from '@angular/core';

import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  today = new Date();
  submissionStatus$ = this.bhsdService.getSubmissionStatus(
    this.today.getMonth(),
    this.today.getFullYear()
  );
  constructor(private bhsdService: BHSDService) {}

  get thisReportingPeriod(): string {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthsName = lastMonth.toLocaleString('en-US', {
      month: 'long',
    });
    const year = today.getFullYear();

    return `${lastMonthsName}, ${year}`;
  }

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
