import { Component } from '@angular/core';
import { BHSDService } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  test = true;
  today = new Date();
  lastMonth = getReportingPeriod(1);
  prevSubmissionMonth = getReportingPeriod(2);

  submissionStatus$ = this.bhsdService.getSubmissionStatus(
    this.lastMonth.getMonth(),
    this.lastMonth.getFullYear()
  );
  pastSubmissionStatus$ = this.bhsdService.getSubmissionStatus(
    this.prevSubmissionMonth.getMonth(),
    this.lastMonth.getFullYear()
  );

  thisReportingPeriod = getReportingPeriodText(this.lastMonth);
  lastReportingPeriod = getReportingPeriodText(this.prevSubmissionMonth);

  constructor(private bhsdService: BHSDService) {}
}
