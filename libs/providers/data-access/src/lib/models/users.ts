export type User = {
  user_id: number;
  email: string;
  last_sign_in_at: Date;
  provider_gateway_identifier: number;
  provider_name: string;
  is_active: boolean;
};

export type UserLogins = {
  users: [User];
  active_user_count: number;
  inactive_user_count: number;
};
