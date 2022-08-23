export interface ExtractRecordData {
  // Key Fields
  admission_date: string;
  arrests_past_30days: string;
  client_id: string;
  collateral: string;
  dob: string;

  // Required Fields
  education: string;
  employment: string;
  episode_id: string;
  ethnicity: string;
  first_name: string;
  gender: string;
  last_contact_date: string;
  last_name: string;

  // Optional Fields
  num_of_prior_admissions: string;
  num_of_prior_episodes: string;
  primary_language: string;
  provider_id: string;
  race: string;
  record_type: string;
  treatment_type: string;
}

export type RecordKeys = keyof ExtractRecordData;
