import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BHSDService } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';
import { SubmissionStatus } from '@dbh/bhsd/data-access';

@Component({
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.scss'],
})
export class PortalDashboardComponent {
  submissionStatus$ = this.bhsdService.getSubmissionStatus();
  activeSubmissions: SubmissionStatus[] = [];
  activeSubmissions$ = this.submissionStatus$.subscribe(
    (response: SubmissionStatus[]) => {
      const submissions = response.filter(submission => submission.providerActiveStatus);
      this.activeSubmissions = submissions;
    }
  );
  searchTerm = '';
  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  constructor(private bhsdService: BHSDService, private router: Router) {}

  setSearchTerm(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  submitSearch() {
    void this.router.navigate(['/search-and-query/client-search'], {
      queryParams: { search: this.searchTerm },
    });
  }

  navigateTo(path: string): void {
    void this.router.navigate([path]);
  }
}
