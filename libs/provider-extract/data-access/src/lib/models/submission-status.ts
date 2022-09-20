export interface SubmissionSummary {
  provider_name: string;
  provider_id: string;
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

export interface SubmissionStatus {
  providerName: string;
  providerId: string;
  mh: boolean;
  sud: boolean;
  status: 'Expecting Submission' | 'Need Resubmission' | 'Current' | 'Past Due';
  submittedOn?: string; // iso 8601 date
  fileName?: string;
  totalRecords?: number;
  pass?: number;
  fail?: number;
  extractId?: string;
}
