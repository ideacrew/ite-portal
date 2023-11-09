import { Component, Input } from '@angular/core';
import { SubmissionStatus } from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-submission-status-chart',
  templateUrl: './submission-status-chart.component.html',
  styleUrls: ['./submission-status-chart.component.scss'],
})
export class SubmissionStatusChartComponent {
  @Input() submissions!: SubmissionStatus[];

  get countOfSubmissions(): number {
    return this.submissions.length;
  }

  get countOfExpectingSubmission(): number {
    return this.submissions.filter(
      (submission) => submission.status === 'Expecting Submission'
    ).length;
  }

  get expectingSubmissionPercentage(): number {
    return Math.round(
      (this.countOfExpectingSubmission / this.countOfSubmissions) * 100
    );
  }

  get countOfNeedsResubmission(): number {
    return this.submissions.filter(
      (submission) => submission.status === 'Need Resubmission'
    ).length;
  }

  get needsResubmissionPercentage(): number {
    return Math.round(
      (this.countOfNeedsResubmission / this.countOfSubmissions) * 100
    );
  }

  get countOfCurrent(): number {
    return this.submissions.filter(
      (submission) => submission.status === 'Current'
    ).length;
  }

  get currentPercentage(): number {
    return Math.round((this.countOfCurrent / this.countOfSubmissions) * 100);
  }

  get countOfPastDue(): number {
    return this.submissions.filter(
      (submission) => submission.status === 'Past Due'
    ).length;
  }

  get pastDuePercentage(): number {
    return Math.round((this.countOfPastDue / this.countOfSubmissions) * 100);
  }

  get expectingSubmissionPosition(): number {
    let border = this.needsResubmissionPercentage;
    if (this.needsResubmissionPercentage > 0) {
      border += 0.25;
    }
    return (border / (100 - this.expectingSubmissionPercentage)) * 100;
  }

  get pastDuePosition(): number {
    let border =
      this.needsResubmissionPercentage + this.expectingSubmissionPercentage;
    if (this.needsResubmissionPercentage > 0) {
      border += 0.25;
    }
    if (this.expectingSubmissionPercentage > 0) {
      border += 0.25;
    }
    return (border / (100 - this.pastDuePercentage)) * 100;
  }

  get currentPosition(): number {
    let border =
      this.needsResubmissionPercentage +
      this.expectingSubmissionPercentage +
      this.pastDuePercentage;
    if (this.needsResubmissionPercentage > 0) {
      border += 0.25;
    }
    if (this.expectingSubmissionPercentage > 0) {
      border += 0.25;
    }
    if (this.pastDuePercentage > 0) {
      border += 0.25;
    }
    return (border / (100 - this.currentPercentage)) * 100;
  }
}
