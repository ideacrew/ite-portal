/* eslint-disable unicorn/consistent-function-scoping */
import { Component } from '@angular/core';
import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

export type Header = {
  label: string;
  value: string;
  sortable: boolean;
};

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  statusFilter = '';
  trMinFilter: number | string = '';
  trMaxFilter: number | string = '';
  prMinFilter: number | string = '';
  prMaxFilter: number | string = '';
  serviceTypeFilter = '';
  providerFilter = '';
  submissionStartFilter = '';
  submissionEndFilter = '';
  sort = 'provider_name';
  sortDirection: 'asc' | 'desc' = 'desc';
  reportingPeriod = getReportingPeriod(1);
  thisReportingPeriod = getReportingPeriodText(this.reportingPeriod);
  rpMonthFilter: number = this.reportingPeriod.getMonth() + 1;
  monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (x) => new Date(2000, x, 2)
  );
  rpYearFilter: number | string = this.reportingPeriod.getFullYear();
  // 2022 is the first time we started adding data to the system
  yearList: number[] = [
    ...Array.from({ length: Number(this.rpYearFilter) - 2022 + 1 }).keys(),
  ].map((x) => x + 2022);
  headerList: Header[] = [
    { label: 'Provider Name', value: 'provider_name', sortable: true },
    { label: 'Service Type', value: 'service_type', sortable: true },
    { label: 'Submission Status', value: 'status', sortable: true },
    { label: 'Submitted On', value: 'submitted_on', sortable: true },
    { label: 'Total Records', value: 'total_records', sortable: true },
    { label: 'Pass', value: 'pass', sortable: false },
    { label: 'Fail', value: 'fail', sortable: false },
    { label: 'Pass Rate', value: 'pass_percentage', sortable: true },
  ];
  submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({});
  allProviders$ = this.bhsdService.getSubmissionStatus();
  constructor(private bhsdService: BHSDService) {}

  updateSort(criteria: string) {
    this.sort = criteria;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.updateFilters('sort');
  }

  updateFilters(key: string, value?: Event) {
    if (value) {
      if (key === 'status') {
        const target = value.target as HTMLInputElement;
        this.statusFilter = target.value ?? '';
      }
      if (key === 'year') {
        const target = value.target as HTMLInputElement;
        this.rpYearFilter = target.value ?? '';
      }
      if (key === 'month') {
        const target = value.target as HTMLInputElement;
        this.rpMonthFilter = target.value
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            Number(target.value) + 1
          : 0;
      }
      if (key === 'trMin') {
        const target = value.target as HTMLInputElement;
        this.trMinFilter = target.value ?? '';
      }
      if (key === 'trMax') {
        const target = value.target as HTMLInputElement;
        this.trMaxFilter = target.value ?? '';
      }
      if (key === 'prMin') {
        const target = value.target as HTMLInputElement;
        this.prMinFilter = target.value ?? '';
      }
      if (key === 'prMax') {
        const target = value.target as HTMLInputElement;
        this.prMaxFilter = target.value ?? '';
      }
      if (key === 'serviceType') {
        const target = value.target as HTMLInputElement;
        this.serviceTypeFilter = target.value ?? '';
      }
      if (key === 'provider') {
        const target = value.target as HTMLInputElement;
        this.providerFilter = target.value ?? '';
      }
      if (key === 'submission_start') {
        const target = value.target as HTMLInputElement;
        this.serviceTypeFilter = target.value ?? '';
      }
      if (key === 'submission_end') {
        const target = value.target as HTMLInputElement;
        this.providerFilter = target.value ?? '';
      }
    }
    this.submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({
      status: this.statusFilter,
      year: this.rpYearFilter.toString(),
      month: this.rpMonthFilter.toString(),
      trMax: this.trMaxFilter.toString(),
      trMin: this.trMinFilter.toString(),
      prMax: this.prMaxFilter.toString(),
      prMin: this.prMinFilter.toString(),
      serviceType: this.serviceTypeFilter,
      provider: this.providerFilter,
      submissionStart: this.submissionStartFilter,
      submissionEnd: this.submissionEndFilter,
      sort: this.sort,
      sortDirection: this.sortDirection,
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
