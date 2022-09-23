import { Component } from '@angular/core';
import { BHSDService } from '@dbh/bhsd/data-access';

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  submissionStatus$ = this.bhsdService.getSubmissionStatus();

  test = true;

  get thisReportingPeriod(): string {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthsName = lastMonth.toLocaleString('en-US', {
      month: 'long',
    });
    const year = today.getFullYear();

    return `${lastMonthsName}, ${year}`;
  }

  constructor(private bhsdService: BHSDService) {}
}
