/* eslint-disable @typescript-eslint/naming-convention */
export type ExtractSubmission = {
  id: string;
  coverage_end: string;
  coverage_start: string;
  submission_date: string;
  file_type: 'Initial' | null;
  number_of_records: number | null;
  fail_count: number | null;
  file_name: string | null;
  pass_count: number | null;
  status: 'Valid' | 'Invalid';
  provider_name: string;
  provider_id: string;
};

export type ProviderListItem = {
  id: string;
  name: string;
};

export type Extracts = {
  total_extract_count: number;
  extract_list: ExtractSubmission[];
  providers: ProviderListItem[];
};
