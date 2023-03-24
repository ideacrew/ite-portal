/* eslint-disable @typescript-eslint/naming-convention */
export type ClientSearchResult = {
  master_client_id: string;
  date_of_birth: Date;
  first_name?: string;
  full_name: string;
  gender: string;
  last_name?: string;
  middle_name?: string;
  record_source: string;
  record_source_date: Date;
  record_source_id: string;
  created_at: Date;
  updated_at: Date;
};
