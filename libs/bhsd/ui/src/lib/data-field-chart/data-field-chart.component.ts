import { Component, Input } from '@angular/core';
import {
  ErrorType,
  ExtractRecordField,
  ExtractRecordValidationV2,
  ValidationV2,
} from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-data-field-chart',
  templateUrl: './data-field-chart.component.html',
  styleUrls: ['./data-field-chart.component.scss'],
})
export class DataFieldChartComponent {
  @Input() record!: ExtractRecordValidationV2;

  get fatalErrors(): ValidationV2[] {
    const fatalErrors = this.record.errors.filter(
      (error) => error.errorType === 'Fatal'
    );

    return fatalErrors;
  }

  get totalErrorCount(): number {
    return this.record.errors.length;
  }

  get allDataFields(): ExtractRecordField[] {
    return Object.keys(this.record.payload) as ExtractRecordField[];
  }

  get totalDataFieldCount(): number {
    const fieldNames = this.record.errors.map((x) => x.fieldName);
    const unique1 = fieldNames.filter((o) => !this.allDataFields.includes(o));
    const unique2 = this.allDataFields.filter((o) => !fieldNames.includes(o));
    const unique = [...unique1, ...unique2];

    return unique.length;
  }

  get dataFieldsWithErrors(): ExtractRecordField[] {
    return this.allDataFields.filter((field) =>
      this.record.errors.some((error) => error.fieldName === field)
    );
  }

  get dataFieldsWithoutErrors(): ExtractRecordField[] {
    return this.allDataFields.filter(
      (field) => !this.dataFieldsWithErrors.includes(field)
    );
  }

  get errorInformation() {
    return {
      fatal: this.getErrorInformation('Fatal'),
      critical: this.getErrorInformation('Critical'),
      warning: this.getErrorInformation('Warning'),
    };
  }

  get errorPercentages() {
    const { fatal, critical, warning } = this.errorInformation;

    return {
      fatal: `${fatal.relativeErrorCount}%`,
      critical: `${critical.relativeErrorCount}%`,
      criticalPosition: `${this.getCriticalPosition()}%`,
      warning: `${warning.relativeErrorCount}%`,
      warningPosition: `${this.getWarningPosition()}%`,
      valid: `${this.validRelativeCount}%`,
      validPosition: `${this.getValidPosition()}%`,
    };
  }

  get validRelativeCount(): number {
    return (
      (this.dataFieldsWithoutErrors.length / this.totalDataFieldCount) * 100
    );
  }

  getErrorInformation(errorType: ErrorType): {
    errorType: ErrorType;
    totalCountOfFieldsWithError: number;
    relativeErrorCount: number;
  } {
    const errors = this.record.errors.filter(
      (error) => error.errorType === errorType
    );

    const relativeErrorCount = (errors.length / this.totalDataFieldCount) * 100;

    return {
      errorType,
      totalCountOfFieldsWithError: errors.length,
      relativeErrorCount,
    };
  }

  getCriticalPosition(): number {
    let border = this.errorInformation.fatal.relativeErrorCount;
    if (this.errorInformation.fatal.relativeErrorCount > 0) {
      border += 0.25;
    }
    return (
      (border / (100 - this.errorInformation.critical.relativeErrorCount)) * 100
    );
  }

  getWarningPosition(): number {
    let border =
      this.errorInformation.fatal.relativeErrorCount +
      this.errorInformation.critical.relativeErrorCount;
    if (this.errorInformation.fatal.relativeErrorCount > 0) {
      border += 0.25;
    }
    if (this.errorInformation.critical.relativeErrorCount > 0) {
      border += 0.25;
    }
    return (
      (border / (100 - this.errorInformation.warning.relativeErrorCount)) * 100
    );
  }

  getValidPosition(): number {
    let border =
      this.errorInformation.fatal.relativeErrorCount +
      this.errorInformation.critical.relativeErrorCount +
      this.errorInformation.warning.relativeErrorCount;
    if (this.errorInformation.fatal.relativeErrorCount > 0) {
      border += 0.25;
    }
    if (this.errorInformation.critical.relativeErrorCount > 0) {
      border += 0.25;
    }
    if (this.errorInformation.warning.relativeErrorCount > 0) {
      border += 0.25;
    }
    return (border / (100 - this.validRelativeCount)) * 100;
  }
}
