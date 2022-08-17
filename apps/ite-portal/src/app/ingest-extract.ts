export interface ExtractSubmission {
  id: string;
  coverage_end: string;
  coverage_start: string;
  submission_date: string;
  file_type: 'Initial' | null;
  number_of_records: number | null;
  record_failure_count: number | null;
  record_warning_count: number | null;
  status: 'Valid' | 'Invalid';
}
