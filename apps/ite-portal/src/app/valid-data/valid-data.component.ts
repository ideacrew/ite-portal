import { Component, Input } from '@angular/core';
import {
  ExtractRecordData,
  ExtractRecordField,
  ExtractRecordValidationV2,
  ValidationV2,
} from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-valid-data',
  templateUrl: './valid-data.component.html',
  styleUrls: ['./valid-data.component.scss'],
})
export class ValidDataComponent {
  @Input() record!: ExtractRecordValidationV2;

  get errors(): ValidationV2[] {
    return this.record.errors;
  }

  get payload(): ExtractRecordData {
    return this.record.payload;
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

  get validFieldsWithData(): {
    fieldName: ExtractRecordField;
    value: string;
  }[] {
    const validFields = this.dataFieldsWithoutErrors.map((field) => ({
      fieldName: field,
      value: this.payload[field],
    }));

    return validFields.sort((a, b) => a.fieldName.localeCompare(b.fieldName));
  }
}
