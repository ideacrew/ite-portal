import { Component } from '@angular/core';
import { BHSDService } from '@dbh/bhsd/data-access';
import { getReportingPeriod, getReportingPeriodText } from '@dbh/bhsd/util';
import { SubmissionStatus } from '@dbh/bhsd/data-access';

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  test = true;
  today = new Date();
  lastMonth = getReportingPeriod(1);
  prevSubmissionMonth = getReportingPeriod(2);
  activeSubmissions: SubmissionStatus[] = [];
  submissionStatus$ = this.bhsdService.getSubmissionStatusByDate({
    month: this.lastMonth.getMonth(),
    year: this.lastMonth.getFullYear(),
  });

  pastSubmissionStatus$ = this.bhsdService.getSubmissionStatusByDate({
    month: this.prevSubmissionMonth.getMonth(),
    year: this.lastMonth.getFullYear(),
  });

  activeSubmissions$ = this.submissionStatus$.subscribe(
    (response: SubmissionStatus[]) => {
      const submissions = response.filter(submission => submission.providerActiveStatus);
      this.activeSubmissions = submissions;
    }
  );

  thisReportingPeriod = getReportingPeriodText(this.lastMonth);
  lastReportingPeriod = getReportingPeriodText(this.prevSubmissionMonth);

  constructor(private bhsdService: BHSDService) {}
}
