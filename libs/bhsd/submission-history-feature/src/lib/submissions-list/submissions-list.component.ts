import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Extracts, BHSDService } from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';

export type Header = {
  label: string;
  value: string;
  sortable: boolean;
  numeric: boolean;
};

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  isDBHUser = this.authService.isDBHUser;
  page = '1';
  offset = '';
  perPage = 20;
  coverageStartFilter = '';
  coverageEndFilter = '';
  submissionStartFilter = '';
  submissionEndFilter = '';
  providerFilter = '';
  trSelectorFilter = '';
  trValueFilter: number | string = '';
  prSelectorFilter = '';
  prValueFilter: number | string = '';
  allFilters = '';
  sort = 'created_at';
  sortDirection: 'asc' | 'desc' = 'desc';
  headerList: Header[] = [
    { label: 'File Name', value: 'file_name', sortable: true, numeric: false },
    {
      label: 'Submission Date',
      value: 'created_at',
      sortable: true,
      numeric: false,
    },
    {
      label: 'Start Date',
      value: 'coverage_start',
      sortable: true,
      numeric: false,
    },
    {
      label: 'End Date',
      value: 'coverage_end',
      sortable: true,
      numeric: false,
    },
    {
      label: 'Total Records',
      value: 'record_count',
      sortable: true,
      numeric: true,
    },
    { label: 'Pass', value: 'pass', sortable: false, numeric: true },
    { label: 'Fail', value: 'fail', sortable: false, numeric: true },
  ];
  responseDetails$: Observable<Extracts> =
    this.bhsdService.getSubmissionsWithParams({ offset: this.offset });

  getPages(count: number, active: string): Array<number | '...'> {
    const pages = Math.ceil(count / this.perPage);
    // eslint-disable-next-line unicorn/new-for-builtins
    const pageArray: Array<number | '...'> = Array(pages)
      .fill(0)
      .map((x, index) => index + 1);
    const lastItem = pageArray[pageArray.length - 1];
    const firstItem = pageArray[0];
    const activePage = Number(active);
    if (pageArray.length <= 5) {
      return pageArray;
    } else if (activePage < 5) {
      return [...pageArray.slice(0, 5), '...', lastItem];
    } else if (activePage > pageArray.length - 4) {
      return [firstItem, '...', ...pageArray.slice(-5)];
    } else {
      return [
        firstItem,
        '...',
        pageArray[activePage - 2],
        pageArray[activePage - 1],
        pageArray[activePage],
        '...',
        lastItem,
      ];
    }
    return pageArray;
  }

  updatePage(pageNumber: string) {
    this.page = pageNumber;
    this.offset = String((Number(pageNumber) - 1) * this.perPage);
    this.submitFilters();
  }

  updateSort(criteria: string) {
    this.sort = criteria;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.submitFilters();
  }

  updateFilters(key: string, event?: Event) {
    if (event) {
      this.page = '1';
      this.offset = '';
      const target = event.target as HTMLInputElement;
      target.classList.add('selected');
      if (key === 'coverage_start') {
        this.coverageStartFilter = target.value ?? '';
      }
      if (key === 'coverage_end') {
        this.coverageEndFilter = target.value ?? '';
      }
      if (key === 'submission_start') {
        this.submissionStartFilter = target.value ?? '';
      }
      if (key === 'submission_end') {
        this.submissionEndFilter = target.value ?? '';
      }
      if (key === 'provider') {
        this.providerFilter = target.value ?? '';
      }
      if (key === 'trSelector') {
        this.trSelectorFilter = target.value ?? '';
      }
      if (key === 'trValue') {
        this.trValueFilter = target.value ?? '';
      }
      if (key === 'prSelector') {
        this.prSelectorFilter = target.value ?? '';
      }
      if (key === 'prValue') {
        this.prValueFilter = target.value ?? '';
      }
    }
    this.submitFilters();
  }

  submitFilters() {
    this.allFilters =
      this.coverageStartFilter +
      this.coverageEndFilter +
      this.trSelectorFilter +
      this.submissionStartFilter +
      this.submissionEndFilter +
      this.providerFilter +
      this.trValueFilter.toString() +
      this.prSelectorFilter +
      this.prValueFilter.toString();
    this.responseDetails$ = this.bhsdService.getSubmissionsWithParams({
      coverageStart: this.coverageStartFilter,
      coverageEnd: this.coverageEndFilter,
      submissionStart: this.submissionStartFilter,
      submissionEnd: this.submissionEndFilter,
      offset: this.offset,
      provider: this.providerFilter,
      trSelector: this.trSelectorFilter,
      trValue: this.trValueFilter.toString(),
      prSelector: this.prSelectorFilter,
      prValue: this.prValueFilter.toString(),
      sort: this.sort,
      sortDirection: this.sortDirection,
    });
  }

  clearFilters() {
    this.coverageStartFilter = '';
    this.coverageEndFilter = '';
    this.submissionStartFilter = '';
    this.submissionEndFilter = '';
    this.providerFilter = '';
    this.trSelectorFilter = '';
    this.trValueFilter = '';
    this.prSelectorFilter = '';
    this.prValueFilter = '';
    this.submitFilters();
  }

  constructor(
    private bhsdService: BHSDService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
}
