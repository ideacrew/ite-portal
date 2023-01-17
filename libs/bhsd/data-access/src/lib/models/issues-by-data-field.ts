import { ExtractRecordField } from './extract-record-data';
import { ExtractRecordValidation } from './extract-record-validation';
import { ValidationCategory } from './validation-category';

export type IssuesByDataField = {
  fieldName: ExtractRecordField;
  affectedRecords: ExtractRecordValidation[];
  // categoryCounts: CategoryCount[];
};

export type CategoryCount = {
  categoryName: ValidationCategory;
  recordCount: number;
};
