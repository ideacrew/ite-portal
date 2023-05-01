/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ErrorType,
  ExtractRecordField,
  ExtractRecordValidationV2,
  ValidationCategory,
  ValidationV2,
} from '@dbh/bhsd/data-access';
import { CategoryWithCount } from '../interfaces';

@Component({
  selector: 'dbh-issues-by-data-field',
  templateUrl: './issues-by-data-field.component.html',
  styleUrls: ['./issues-by-data-field.component.scss'],
})
export class IssuesByDataFieldComponent {
  @Input() records!: ExtractRecordValidationV2[];

  get allErrors(): ValidationV2[] {
    return this.records.flatMap((record) => record.errors);
  }

  getAllErrorsByFieldName(fieldName: ExtractRecordField): ValidationV2[] {
    return this.allErrors.filter(
      (error: ValidationV2) => error.fieldName === fieldName
    );
  }

  getCountOfRecordsWithFieldError(fieldName: ExtractRecordField): number {
    return this.getRecordsWithFieldError(fieldName).length;
  }

  getRecordsWithFieldError(
    fieldName: ExtractRecordField
  ): ExtractRecordValidationV2[] {
    return this.records.filter((record: ExtractRecordValidationV2) =>
      record.errors.some((error: ValidationV2) => error.fieldName === fieldName)
    );
  }

  getCountOfErrorsWithCategoryName(
    category: ValidationCategory,
    errors: ValidationV2[]
  ): number {
    return errors.filter((error) => error.category === category).length;
  }

  getCategoriesWithCount(fieldName: ExtractRecordField): CategoryWithCount[] {
    const affectedRecords = this.getRecordsWithFieldError(fieldName);
    const allErrors: ValidationV2[] = affectedRecords
      .flatMap((record) => record.errors)
      .filter((error) => error.fieldName === fieldName);
    const categories: ValidationCategory[] = allErrors.map(
      (error) => error.category
    );

    const uniqueCategories: ValidationCategory[] = [...new Set(categories)];

    const categoriesWithCount = uniqueCategories.map((category) => ({
      category,
      count: this.getCountOfErrorsWithCategoryName(category, allErrors),
    }));

    return categoriesWithCount;
  }

  getErrorsOfType(errorType: ErrorType): ValidationV2[] {
    return this.allErrors.filter(
      (error: ValidationV2) => error.errorType === errorType
    );
  }

  getFieldNamesInErrorGroup(errorType: ErrorType): ExtractRecordField[] {
    const errorsOfType = this.getErrorsOfType(errorType);

    const allFieldNames: ExtractRecordField[] = errorsOfType.map(
      (error: ValidationV2) => error.fieldName
    );

    const uniqueFieldNames: ExtractRecordField[] = [...new Set(allFieldNames)];

    return uniqueFieldNames;
  }

  get fatalFields(): ExtractRecordField[] {
    return this.getFieldNamesInErrorGroup('Fatal');
  }

  get criticalFields(): ExtractRecordField[] {
    return this.getFieldNamesInErrorGroup('Critical');
  }

  get warningFields(): ExtractRecordField[] {
    return this.getFieldNamesInErrorGroup('Warning');
  }

  originalOrder(
    a: KeyValue<string, ExtractRecordField>,
    b: KeyValue<string, ExtractRecordField>
  ): number {
    return 0;
  }
}
