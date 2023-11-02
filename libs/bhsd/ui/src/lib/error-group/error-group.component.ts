/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input } from '@angular/core';
import {
  ErrorType,
  ExtractRecordValidationV2,
  ValidationV2,
} from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-error-group',
  templateUrl: './error-group.component.html',
  styleUrls: ['./error-group.component.scss'],
})
export class ErrorGroupComponent {
  @Input() errorType!: ErrorType | undefined;
  @Input() record!: ExtractRecordValidationV2;

  fieldType: Record<ErrorType, string> = {
    Fatal: 'Key',
    Critical: 'Required',
    Warning: 'Optional',
  };

  get errors(): ValidationV2[] {
    const { errors } = this.record;

    const filteredErrors = errors.filter(
      (validation) => validation.errorType === this.errorType
    );

    return filteredErrors;
  }

  get fieldTypeName(): string {
    return this.fieldType[this.errorType ?? 'Warning'];
  }

  get errorCount(): number {
    if (!this.errors || this.errors.length === 0) {
      return 0;
    } else {
      const groups: { [key: string]: ValidationV2[] } = {};
      for (const current of this.errors) {
        const key = current.fieldName;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(current);
      }
      return Object.keys(groups).length;
    }
  }

  get errorHeading(): string {
    if (this.errorType) {
      return this.errorType === 'Warning'
        ? `${this.errorType}s`
        : `${this.errorType} Errors`;
    } else {
      return 'Valid Data';
    }
  }
}
