import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ClaimSearch, ClaimsService } from '@dbh/claims/data-access';
import { Criterion } from '@dbh/claims/data-access/models';

@Component({
  templateUrl: './advanced-claim-search.component.html',
  styleUrls: ['./advanced-claim-search.component.scss'],
})
export class AdvancedClaimSearchComponent {
  searchResults$: Observable<ClaimSearch> | undefined = undefined;
  criteria: Criterion[] = [{}];
  validCriteria: Criterion[] = this.criteria.filter(
    (criterion) =>
      criterion.selector &&
      criterion.valueType &&
      criterion.relative &&
      criterion.value
  );
  searchDisabled = true;
  page = '1';
  offset = 0;
  perPage = 20;

  procedureCodes$ = this.claimsService.getProcedureCodes();
  providerTypes$ = this.claimsService.getProviderTypes();

  constructor(
    private route: ActivatedRoute,
    private claimsService: ClaimsService,
    private router: Router
  ) {}

  submitAdvancedSearch() {
    this.checkValid();
    this.searchResults$ = this.claimsService.advancedClaimSearch(
      this.validCriteria,
      this.offset
    );
    this.page = '1';
    this.offset = 0;
  }

  removeCondition(index: number) {
    this.criteria.splice(index, 1);
    if (this.criteria.length === 0) {
      this.criteria.push({});
    }
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
          case 'adjudication_status': {
            criterion.options = [
              { value: 'paid', display: 'Paid' },
              { value: 'denied', display: 'Denied' },
            ];

            break;
          }
          case 'billing_provider_type_code': {
            criterion.asyncOptions = this.providerTypes$;

            break;
          }
          case 'procedure_code': {
            criterion.asyncOptions = this.procedureCodes$;

            break;
          }
          // No default
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
    this.offset = (Number(pageNumber) - 1) * this.perPage;
    this.submitAdvancedSearch();
  }
}
