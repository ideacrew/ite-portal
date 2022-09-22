import { Component, Input } from '@angular/core';

@Component({
  selector: 'dbh-validation-breakdown',
  templateUrl: './validation-breakdown.component.html',
  styleUrls: ['./validation-breakdown.component.scss'],
})
export class ValidationBreakdownComponent {
  @Input() totalRecords!: number;
  @Input() pass!: number;
  @Input() fail!: number;

  get passPercentage(): number {
    return Math.round((this.pass / this.totalRecords) * 100);
  }

  get failPercentage(): number {
    return Math.round((this.fail / this.totalRecords) * 100);
  }
}
