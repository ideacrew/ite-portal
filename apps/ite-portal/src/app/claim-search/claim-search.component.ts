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
  // eslint-disable-next-line unicorn/consistent-function-scoping
  parameters$ = this.route.queryParamMap.subscribe((parameters) => {
    this.searchTerm = parameters.get('search') || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.searchResults$ =
      this.searchTerm === ''
        ? undefined
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          this.claimsService.claimSearch(this.searchTerm);
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

  constructor(
    private route: ActivatedRoute,
    private claimsService: ClaimsService,
    private router: Router
  ) {}
}
