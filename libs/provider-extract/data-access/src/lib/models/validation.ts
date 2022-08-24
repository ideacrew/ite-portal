import { ErrorType } from './error-types';
import { ExtractRecordField } from './extract-record-data';
import { ValidationCategory } from './validation-category';
import { ValidationMessage } from './validation-message';

export type Validation = Partial<Record<ExtractRecordField, ValidationMessage>>;

export interface ValidationV2 {
  errorType: ErrorType;
  fieldName: ExtractRecordField;
  text: string;
  category: ValidationCategory | null;
}
