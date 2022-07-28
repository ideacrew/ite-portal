export interface ExtractSubmission {
  id: string;
  coverage_end: string;
  coverage_start: string;
  submission_date: string;
  file_type: 'Initial' | null;
  record_group: 'admission' | 'discharge' | null;
  number_of_records: number;
  record_failure_count: number;
  record_warning_count: number;
}
