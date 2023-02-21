import { Component } from '@angular/core';
import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  statusFilter = '';
  submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
    status: this.statusFilter,
  });
  constructor(private bhsdService: BHSDService) {}

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  reportingPeriod = getReportingPeriod(1);

  updateFilters(key: string, value?: any) {
    if (key === 'status') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      this.statusFilter = value.target.value ?? '';
    }
    this.submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
      status: this.statusFilter,
    });
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
