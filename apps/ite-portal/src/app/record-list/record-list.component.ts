import { Component, Input } from '@angular/core';

import {
  ExtractRecordValidationV2,
  ValidationV2,
} from '@dbh/provider-extract/data-access';

@Component({
  selector: 'dbh-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
})
export class RecordListComponent {
  @Input() record!: ExtractRecordValidationV2;

  get identifier(): string {
    return `${this.record.payload.client_id}_${this.record.payload.admission_date}_${this.record.payload.record_type}${this.record.payload.treatment_type}`;
  }

  get fatalErrorCount(): number {
    return this.record.errors.filter(
      (error: ValidationV2) => error.errorType === 'Fatal'
    ).length;
  }

  get criticalErrorCount(): number {
    return this.record.errors.filter(
      (error: ValidationV2) => error.errorType === 'Critical'
    ).length;
  }

  get warningCount(): number {
    return this.record.errors.filter(
      (error: ValidationV2) => error.errorType === 'Warning'
    ).length;
  }
}
