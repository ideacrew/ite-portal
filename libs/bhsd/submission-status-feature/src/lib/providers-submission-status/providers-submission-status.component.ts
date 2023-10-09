/* eslint-disable unicorn/consistent-function-scoping */
import { Component } from '@angular/core';
import { BHSDService, SubmissionStatus } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';
import { Criterion, ValueOption } from '@dbh/claims/data-access/models';

export type Header = {
  label: string;
  value: string;
  sortable: boolean;
  numeric: boolean;
};

@Component({
  templateUrl: './providers-submission-status.component.html',
  styleUrls: ['./providers-submission-status.component.scss'],
})
export class ProvidersSubmissionStatusComponent {
  criteria: Criterion[] = [{}];
  validCriteria: Criterion[] = this.criteria.filter(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    (criterion) =>
      criterion.selector &&
      criterion.valueType &&
      criterion.relative &&
      criterion.value
  );
  searchDisabled = true;
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
  allFilters = '';
  // 2022 is the first time we started adding data to the system
  yearList: number[] = [
    ...Array.from({ length: Number(this.rpYearFilter) - 2022 + 1 }).keys(),
  ].map((x) => x + 2022);
  headerList: Header[] = [
    {
      label: 'Provider Name',
      value: 'provider_name',
      sortable: true,
      numeric: false,
    },
    {
      label: 'Service Type',
      value: 'service_type',
      sortable: false,
      numeric: false,
    },
    {
      label: 'Submission Status',
      value: 'status',
      sortable: true,
      numeric: false,
    },
    {
      label: 'Submitted On',
      value: 'submitted_on',
      sortable: true,
      numeric: false,
    },
    {
      label: 'Total Records',
      value: 'total_records',
      sortable: true,
      numeric: true,
    },
    { label: 'Pass', value: 'pass', sortable: false, numeric: true },
    { label: 'Fail', value: 'fail', sortable: false, numeric: true },
    {
      label: 'Pass Rate',
      value: 'pass_percentage',
      sortable: true,
      numeric: true,
    },
  ];
  submissionStatus$ = this.bhsdService.getFilteredSubmissionStatus({});
  providers: ValueOption[] = [];
  allProviders$ = this.bhsdService.getSubmissionStatus();
  providers$ = this.allProviders$.subscribe((response: SubmissionStatus[]) => {
    const providersHash = response.map((provider) =>
      ({ value: provider.providerId, display: provider.providerName })
      );
    this.providers = providersHash;
  });
  constructor(private bhsdService: BHSDService) {}

  updateSort(criteria: string) {
    this.sort = criteria;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.advancedSearch();
  }

  advancedSearch() {
    this.submissionStatus$ = this.bhsdService.getSubmissionStatusWithCriteria(
      this.validCriteria,
      this.rpMonthFilter,
      Number(this.rpYearFilter),
      this.sort,
      this.sortDirection
    );
  }

  submitAdvancedSearch() {
    this.checkValid();
    this.advancedSearch();
  }

  removeCondition(index: number) {
    this.criteria.splice(index, 1);
    this.checkValid();
  }

  addCondition() {
    this.criteria.push({});
    this.checkValid();
  }

  selectorSet(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value ?? '';
    const valueType = target.selectedOptions[0].dataset['valuetype'] ?? '';
    const index = target.dataset['id'];
    if (index) {
      const criterion = this.criteria[Number(index)];
      if (criterion) {
        criterion.valueType = valueType;
        criterion.selector = value;
        criterion.value = undefined;
        criterion.relative = undefined;
        criterion.options = undefined;
        criterion.asyncOptions = undefined;
      }
      this.checkValid();
    }
  }

  relativeSet(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log(target.value)
    const value = target.value ?? '';
    console.log(value)
    const index = target.dataset['id'];
    if (index) {
      const criterion = this.criteria[Number(index)];
      if (criterion) {
        criterion.relative = value;
        switch (criterion.selector) {
          case 'provider_id': {
            if (this.providers.length > 0) {
              criterion.options = this.providers;
            }
            break;
          }
          case 'mh': {
            criterion.options = [
              { value: 'TRUE', display: 'TRUE' },
              { value: 'FALSE', display: 'FALSE' },
            ];

            break;
          }
          case 'sud': {
            criterion.options = [
              { value: 'TRUE', display: 'TRUE' },
              { value: 'FALSE', display: 'FALSE' },
            ];

            break;
          }
        }
        this.checkValid();
      }
    }
  }

  valueSet(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value ?? '';
    const index = target.dataset['id'];
    if (index) {
      const criterion = this.criteria[Number(index)];
      if (criterion) {
        criterion.value = value;
        this.checkValid();
      }
    }
  }

  checkValid() {
    this.validCriteria = this.criteria.filter(
      // eslint-disable-next-line unicorn/consistent-function-scoping
      (condition) =>
        condition.selector &&
        condition.valueType &&
        condition.relative &&
        condition.value
    );
    this.searchDisabled =
      this.validCriteria.length > 0 &&
      this.validCriteria.length === this.criteria.length
        ? false
        : true;
  }

  updateFilters(key: string, value?: Event) {
    if (value) {
      const target = value.target as HTMLInputElement;
      target.classList.add('selected');
      if (key === 'status') {
        this.statusFilter = target.value ?? '';
      }
      if (key === 'year') {
        this.rpYearFilter = target.value ?? '';
      }
      if (key === 'month') {
        this.rpMonthFilter = target.value
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            Number(target.value) + 1
          : 0;
      }
      if (key === 'trMin') {
        this.trMinFilter = target.value ?? '';
      }
      if (key === 'trMax') {
        this.trMaxFilter = target.value ?? '';
      }
      if (key === 'prMin') {
        this.prMinFilter = target.value ?? '';
      }
      if (key === 'prMax') {
        this.prMaxFilter = target.value ?? '';
      }
      if (key === 'serviceType') {
        this.serviceTypeFilter = target.value ?? '';
      }
      if (key === 'provider') {
        this.providerFilter = target.value ?? '';
      }
      if (key === 'submission_start') {
        this.submissionStartFilter = target.value ?? '';
      }
      if (key === 'submission_end') {
        this.submissionEndFilter = target.value ?? '';
      }
    }
    this.submitFilters();
  }

  submitFilters() {
    this.allFilters =
      this.statusFilter +
      this.rpYearFilter.toString() +
      this.rpMonthFilter.toString() +
      this.trMaxFilter.toString() +
      this.trMinFilter.toString() +
      this.prMaxFilter.toString() +
      this.prMinFilter.toString() +
      this.serviceTypeFilter +
      this.providerFilter +
      this.submissionStartFilter +
      this.submissionEndFilter;
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

  clearFilters() {
    this.statusFilter = '';
    this.trMinFilter = '';
    this.trMaxFilter = '';
    this.prMinFilter = '';
    this.prMaxFilter = '';
    this.serviceTypeFilter = '';
    this.providerFilter = '';
    this.submissionStartFilter = '';
    this.submissionEndFilter = '';
    this.rpMonthFilter = this.reportingPeriod.getMonth() + 1;
    this.rpYearFilter = this.reportingPeriod.getFullYear();
    this.submitFilters();
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
