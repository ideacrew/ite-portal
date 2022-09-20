export interface ExtractSubmission {
  id: string;
  coverage_end: string;
  coverage_start: string;
  submission_date: string;
  file_type: 'Initial' | null;
  number_of_records: number | null;
  fail_count: number | null;
  pass_count: number | null;
  status: 'Valid' | 'Invalid';
  provider_name: string;
  provider_id: string;
}
