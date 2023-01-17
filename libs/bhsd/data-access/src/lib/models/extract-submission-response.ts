/* eslint-disable @typescript-eslint/naming-convention */
import {
  ExtractRecordValidation,
  ExtractRecordValidationV2,
} from './extract-record-validation';

export type ExtractSubmissionResponse = {
  _id: {
    $oid: string;
  };
  provider_id: {
    $oid: string;
  };
  coverage_end: string; // e.g. "2022-02-01"
  coverage_start: string;
  created_at: string;
  extracted_on: string;
  file_name: string | null;
  provider_gateway_identifier: string;
  records: ExtractRecordValidation[];
  status: string | null;
  updated_at: string;
  provider_name: string;
};

export type ExtractSubmissionResponseV2 = {
  _id: {
    $oid: string;
  };
  provider_id: {
    $oid: string;
  };
  coverage_end: string; // e.g. "2022-02-01"
  coverage_start: string;
  created_at: string;
  extracted_on: string;
  file_name: string | null;
  provider_gateway_identifier: string;
  records: ExtractRecordValidationV2[];
  status: string | null;
  updated_at: string;
  provider_name: string;
};
