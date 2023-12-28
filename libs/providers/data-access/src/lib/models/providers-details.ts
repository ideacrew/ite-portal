/* eslint-disable @typescript-eslint/naming-convention */

export type User = {
  id: string;
  email: string;
  last_sign_in_at?: Date | null;
  is_active: boolean;
};

export type ProviderDetails = {
  id: string;
  provider_name: string;
  provider_nick_name?: string | null;
  npi?: string | null;
  provider_gateway_identifier: string;
  is_active: boolean;
  mh: boolean;
  sud: boolean;
  adult_care: boolean;
  child_care: boolean;
  updated_at: Date;
  created_at: Date;
  users: [User];
  last_activity?: Date | null;
  active_user_count?: number | null;
  inactive_user_count?: number | null;
};

export type ProvidersDetails = {
  providers: [ProviderDetails];
  provider_count: number;
  active_provider_count: number;
  inactive_provider_count: number
};
