/* eslint-disable @typescript-eslint/naming-convention */
export type Provider = {
  user_id: number;
  email: string;
  last_sign_in_at: Date;
  provider_gateway_identifier: number;
  provider_name: string;
};

export type ProvidersLog = {
  users: [Provider];
};
