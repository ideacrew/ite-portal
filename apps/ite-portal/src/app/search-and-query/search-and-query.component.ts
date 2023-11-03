import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@dbh/auth';

@Component({
  templateUrl: './search-and-query.component.html',
  styleUrls: ['./search-and-query.component.scss'],
})
export class SearchAndQueryComponent {
  searchTerm = '';

  constructor(private authService: AuthService, private router: Router) {}
  setSearchTerm(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  submitClientSearch() {
    void this.router.navigate(['/search-and-query/client-search'], {
      queryParams: { search: this.searchTerm },
    });
  }

  submitClaimSearch() {
    void this.router.navigate(['/search-and-query/claim-search'], {
      queryParams: { search: this.searchTerm },
    });
  }
}
