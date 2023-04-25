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

    // get expectingSubmissionPosition(): number {
    //   let border = this.needsResubmissionPercentage;
    //   if (this.needsResubmissionPercentage > 0) {
    //     border += 0.25;
    //   }
    //   return (border / (100 - this.expectingSubmissionPercentage)) * 100;
    // }

    // get pastDuePosition(): number {
    //   let border =
    //     this.needsResubmissionPercentage + this.expectingSubmissionPercentage;
    //   if (this.needsResubmissionPercentage > 0) {
    //     border += 0.25;
    //   }
    //   if (this.expectingSubmissionPercentage > 0) {
    //     border += 0.25;
    //   }
    //   return (border / (100 - this.pastDuePercentage)) * 100;
    // }

    // get currentPosition(): number {
    //   let border =
    //     this.needsResubmissionPercentage +
    //     this.expectingSubmissionPercentage +
    //     this.pastDuePercentage;
    //   if (this.needsResubmissionPercentage > 0) {
    //     border += 0.25;
    //   }
    //   if (this.expectingSubmissionPercentage > 0) {
    //     border += 0.25;
    //   }
    //   if (this.pastDuePercentage > 0) {
    //     border += 0.25;
    //   }
    //   return (border / (100 - this.currentPercentage)) * 100;
    // }

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
