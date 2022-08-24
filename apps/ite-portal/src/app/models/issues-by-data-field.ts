import { ExtractRecordField } from './extract-record-data';
import { ExtractRecordValidation } from './extract-record-validation';
import { ValidationCategory } from './validation-category';

export interface IssuesByDataField {
  fieldName: ExtractRecordField;
  affectedRecords: ExtractRecordValidation[];
  // categoryCounts: CategoryCount[];
}

export interface CategoryCount {
  categoryName: ValidationCategory;
  recordCount: number;
}
