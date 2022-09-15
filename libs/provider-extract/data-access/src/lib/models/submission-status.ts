export interface SubmissionSummary {
  provider_name: string;
  mh: boolean;
  sud: boolean;

  // Need to split these into separate interfaces
  status: 'Expecting Submission' | 'Need Resubmission' | 'Current' | 'Past Due';
  submitted_on: string; // iso 8601 date
  file_name: string;
  total_records: string | 'N/A';
  pass: string | 'N/A';
  fail: string | 'N/A';
  extract_id: { $oid: string };
}

interface BaseSubmissionStatus {
  providerName: string;
  mh: boolean;
  sud: boolean;
}

export interface ExpectingSubmission extends BaseSubmissionStatus {
  status: 'Expecting Submission';
}

export interface ExistingSubmission extends BaseSubmissionStatus {
  status: 'Need Resubmission' | 'Current' | 'Past Due';
  submittedOn: string; // iso 8601 date
  fileName: string;
  totalRecords: number;
  pass: number;
  fail: number;
  extractId: string;
}

export type SubmissionStatus = ExpectingSubmission | ExistingSubmission;
