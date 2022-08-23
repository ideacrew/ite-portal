import { ExtractRecordData } from './extract-record-data';
import { Validation } from './validation';
import { ValidationStatus } from './validation-status';

export interface ExtractRecordValidation {
  _id: {
    $oid: string;
  };
  extract_id: {
    $oid: string;
  };
  created_at: string;
  critical_errors: Validation[];
  fatal_errors: Validation[];
  payload: ExtractRecordData;
  status: ValidationStatus;
  updated_at: string;
  warnings: Validation[];
}
