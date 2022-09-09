export interface SubmissionStatus {
  provider_name: string;
  status: 'Need Resubmission' | 'Current' | 'Expecting Submission';
  submitted_on: string; // iso 8601 date
  total_records: string | 'N/A';
  pass: string | 'N/A';
  fail: string | 'N/A';
}
