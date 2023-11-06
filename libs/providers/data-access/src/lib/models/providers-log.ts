/* eslint-disable @typescript-eslint/naming-convention */
type Provider = {
  userId: number;
  email: string;
  lastSignInAt: Date;
  providerGatewayIdentifier: number;
  providerName: string;
};

export type ProvidersLog = {
  users: [Provider];
};
