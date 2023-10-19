/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  production: true,
  NX_GATEWAY_API: 'https://api-provider.dbh.dc.gov',
  NX_PORTAL_API: 'https://api-portal.dbh.dc.gov',
  B2C_SUBDOMAIN: process.env['NX_B2C_SUBDOMAIN_PROD'],
  NX_GATEWAY_C_ID: process.env['NX_GATEWAY_C_ID_PROD'],
};
