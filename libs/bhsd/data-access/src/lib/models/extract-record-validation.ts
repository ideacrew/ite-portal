/* eslint-disable @typescript-eslint/naming-convention */
import { ExtractRecordData } from './extract-record-data';
import { Validation, ValidationV2 } from './validation';
import { ValidationStatus } from './validation-status';

export type ExtractRecordValidation = {
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
};

export type ExtractRecordValidationV2 = {
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
};

export type FailingDataField = {
  field_name: string;
  field_type: string;
  error_type: string;
  record_id: string | null;
  error_message: string | null;
  input: string | null;
};

export type ExtractRecordValidationRecordCounts = {
  record_id: string;
  fatal_error_count: number | null;
  critical_error_count: number | null;
  warning_count: number | null;
  status: string;
};

export type ExtractRecordValidationFlatPayload = {
  errors: ValidationV2[];
  status: ValidationStatus;
  address_city?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  address_state?: string | null;
  address_ward?: string | null;
  address_zipcode?: string | null;
  admission_date?: string | null;
  admission_id?: string | null;
  arrests_past_30days_admission?: string | null;
  arrests_past_30days_discharge?: string | null;
  client_id?: string | null;
  co_occurring_sud_mh?: string | null;
  collateral?: string | null;
  criminal_justice_referral?: string | null;
  discharge_date?: string | null;
  discharge_reason?: string | null;
  dob?: string | null;
  education?: string | null;
  employment?: string | null;
  ethnicity?: string | null;
  first_name?: string | null;
  first_name_alt?: string | null;
  gaf_score_admission?: string | null;
  gaf_score_discharge?: string | null;
  gender?: string | null;
  health_insurance?: string | null;
  income_source?: string | null;
  last_contact_date?: string | null;
  last_name?: string | null;
  last_name_alt?: string | null;
  legal_status?: string | null;
  living_arrangement?: string | null;
  marital_status?: string | null;
  medicaid_id?: string | null;
  mh_dx1?: string | null;
  mh_dx2?: string | null;
  mh_dx3?: string | null;
  middle_name?: string | null;
  non_bh_dx1?: string | null;
  non_bh_dx2?: string | null;
  non_bh_dx3?: string | null;
  not_in_labor?: string | null;
  num_of_prior_su_episodes?: string | null;
  opioid_therapy?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  pregnant?: string | null;
  primary_language?: string | null;
  primary_payment_source?: string | null;
  primary_su_age_at_first_use?: string | null;
  primary_su_frequency_admission?: string | null;
  primary_su_frequency_discharge?: string | null;
  primary_su_route?: string | null;
  primary_substance?: string | null;
  race?: string | null;
  record_type?: string | null;
  referral_source?: string | null;
  school_attendance?: string | null;
  secondary_su_age_at_first_use?: string | null;
  secondary_su_frequency_admission?: string | null;
  secondary_su_frequency_discharge?: string | null;
  secondary_su_route?: string | null;
  secondary_substance?: string | null;
  self_help_group_admission?: string | null;
  self_help_group_discharge?: string | null;
  service_request_date?: string | null;
  sexual_orientation?: string | null;
  smi_sed?: string | null;
  ssn?: string | null;
  sud_dx1?: string | null;
  sud_dx2?: string | null;
  sud_dx3?: string | null;
  suffix?: string | null;
  tertiary_su_age_at_first_use?: string | null;
  tertiary_su_frequency_admission?: string | null;
  tertiary_su_frequency_discharge?: string | null;
  tertiary_su_route?: string | null;
  tertiary_substance?: string | null;
  treatment_type?: string | null;
  veteran_status?: string | null;
};

export type ExtractSubmissionDemographics = {
  recordCount: number;
  genders: DemographicData[];
  races: DemographicData[];
  ethnicities: DemographicData[];
  ages: DemographicData[];
};

export type DemographicData = {
  label: string;
  count: number;
  percent: number;
};
