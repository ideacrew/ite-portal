import { Component, Input } from '@angular/core';
import { ExistingSubmission } from '@dbh/provider-extract/data-access';

@Component({
  selector: 'dbh-validation-breakdown',
  templateUrl: './validation-breakdown.component.html',
  styleUrls: ['./validation-breakdown.component.scss'],
})
export class ValidationBreakdownComponent {
  @Input() submission!: ExistingSubmission;

  get totalRecords(): number {
    return this.submission.totalRecords;
  }

  get pass(): number {
    return this.submission.pass;
  }

  get fail(): number {
    return this.submission.fail;
  }

  get passPercentage(): number {
    return Math.round((this.pass / this.totalRecords) * 100);
  }

  get failPercentage(): number {
    return Math.round((this.fail / this.totalRecords) * 100);
  }
}
