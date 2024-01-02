/* eslint-disable @typescript-eslint/naming-convention */
export type User = {
  user_id: string;
  email: string;
  last_sign_in_at?: Date | null;
  is_active: boolean;
  is_dbh: boolean;
  is_provider: boolean;
  provider_gateway_identifier: string;
  provider_name: string;
  error?: string;
};
