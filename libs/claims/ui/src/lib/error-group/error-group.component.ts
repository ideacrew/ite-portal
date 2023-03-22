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
  fieldType: Record<ErrorType, string> = {
    Fatal: 'Key',
    Critical: 'Required',
    Warning: 'Optional',
  };

  @Input() errorType!: ErrorType | undefined;
  @Input() record!: ExtractRecordValidationV2;

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
    return this.errors.length;
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
