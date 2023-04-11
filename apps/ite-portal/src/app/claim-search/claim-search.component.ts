import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ClaimSearch, ClaimsService } from '@dbh/claims/data-access';

@Component({
  templateUrl: './claim-search.component.html',
  styleUrls: ['./claim-search.component.scss'],
})
export class ClaimSearchComponent {
  searchTerm = '';
  searchResults$: Observable<ClaimSearch> | undefined = undefined;
  page = '1';
  offset = 0;
  perPage = 20;
  // eslint-disable-next-line unicorn/consistent-function-scoping
  parameters$ = this.route.queryParamMap.subscribe((parameters) => {
    this.searchTerm = parameters.get('search') || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.searchResults$ =
      this.searchTerm === ''
        ? undefined
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          this.claimsService.claimSearch(this.searchTerm, this.offset);
  });

  setSearchTerm(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  submitSearch() {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm },
    });
  }

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
    this.offset = (Number(pageNumber) - 1) * this.perPage;
    this.submitSearch();
  }

  constructor(
    private route: ActivatedRoute,
    private claimsService: ClaimsService,
    private router: Router
  ) {}
}
