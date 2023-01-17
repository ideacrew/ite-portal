import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BHSDService } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

@Component({
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.scss'],
})
export class PortalDashboardComponent {
  submissionStatus$ = this.bhsdService.getSubmissionStatus();
  constructor(private bhsdService: BHSDService, private router: Router) {}

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  navigateTo(path: string): void {
    void this.router.navigate([path]);
  }
}
