import { Component, Input } from '@angular/core';
import {
  ErrorType,
  ExtractRecordField,
  ExtractRecordValidationV2,
  ValidationV2,
} from '@dbh/provider-extract/data-access';

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
    return this.allDataFields.length;
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
      critical: `${fatal.relativeErrorCount + critical.relativeErrorCount}%`,
      warning: `${
        fatal.relativeErrorCount +
        critical.relativeErrorCount +
        warning.relativeErrorCount
      }%`,
    };
  }

  get validRelativeCount(): number {
    return (
      (this.dataFieldsWithoutErrors.length / this.totalDataFieldCount) * 100
    );
  }
}
