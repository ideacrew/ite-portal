/* eslint-disable unicorn/consistent-function-scoping */
import { Component } from '@angular/core';
import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  statusFilter = '';
  reportingPeriod = getReportingPeriod(1);
  thisReportingPeriod = getReportingPeriodText(this.reportingPeriod);
  rpMonthFilter: number = this.reportingPeriod.getMonth() + 1;
  monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (x) => new Date(2000, x, 2)
  );
  rpYearFilter = this.reportingPeriod.getFullYear();
  // 2022 is the first time we started adding data to the system
  yearList: number[] = [
    ...Array.from({ length: this.rpYearFilter - 2022 + 1 }).keys(),
  ].map((x) => x + 2022);
  submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({});
  constructor(private bhsdService: BHSDService) {}

  updateFilters(key: string, value?: any) {
    if (key === 'status') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      this.statusFilter = value.target.value ?? '';
    }
    if (key === 'year') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      this.rpYearFilter = value.target.value ?? '';
    }
    if (key === 'month') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      this.rpMonthFilter = value.target.value
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Number(value.target.value) + 1
        : 0;
    }
    this.submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
      status: this.statusFilter,
      year: this.rpYearFilter.toString(),
      month: this.rpMonthFilter.toString(),
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
