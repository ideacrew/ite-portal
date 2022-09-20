import { ExtractRecordData } from './extract-record-data';
import { Validation, ValidationV2 } from './validation';
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

export interface ExtractRecordValidationV2 {
  _id: {
    $oid: string;
  };
  extract_id: {
    $oid: string;
  };
  created_at: string;
  errors: ValidationV2[];
  payload: ExtractRecordData;
  status: ValidationStatus;
  updated_at: string;
}
