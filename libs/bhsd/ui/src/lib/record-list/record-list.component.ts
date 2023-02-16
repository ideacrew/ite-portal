/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input } from '@angular/core';

import { ExtractRecordValidationV2, ValidationV2 } from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
})
export class RecordListComponent {
  @Input() record!: ExtractRecordValidationV2;

  get identifier(): string {
    const { client_id, admission_date, record_type, treatment_setting } =
      this.record.payload;

    return `${client_id ?? 'no-client-id'}_${
      admission_date ?? 'no-admission-date'
    }_${record_type ?? 'no-record-type'}${
      treatment_setting ?? '_no-treatment-setting'
    }`;
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
