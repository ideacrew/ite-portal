import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Extracts, BHSDService } from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';
import { Criterion, ValueOption } from '@dbh/claims/data-access/models';

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
  criteria: Criterion[] = [{}];
  validCriteria: Criterion[] = this.criteria.filter(
    (criterion) =>
      criterion.selector &&
      criterion.valueType &&
      criterion.relative &&
      criterion.value
  );
  searchDisabled = true;
  isDBHUser = this.authService.isDBHUser || true;
  page = '1';
  offset = '';
  perPage = 20;
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
  providers: ValueOption[] = [];
  responseDetails$: Observable<Extracts> =
    this.bhsdService.getSubmissionsWithCriteria(
      this.validCriteria,
      this.offset
    );
  providers$ = this.responseDetails$.subscribe((response: Extracts) => {
    const providersHash = response.providers.map((provider) => ({
      value: provider.id,
      display: provider.name,
    }));
    this.providers = providersHash;
  });

  constructor(
    private bhsdService: BHSDService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  getPages(count: number, active: string): Array<number | '...'> {
    const pages = Math.ceil(count / this.perPage);
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
    this.advancedSearch();
  }

  updateSort(criteria: string) {
    this.sort = criteria;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.advancedSearch();
  }

  advancedSearch() {
    this.responseDetails$ = this.bhsdService.getSubmissionsWithCriteria(
      this.validCriteria,
      this.offset,
      this.sort,
      this.sortDirection
    );
  }

  submitAdvancedSearch() {
    this.checkValid();
    this.page = '1';
    this.offset = '';
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
    const value = target.value ?? '';
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
}
