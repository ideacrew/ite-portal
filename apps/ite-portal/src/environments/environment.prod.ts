/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/naming-convention */

export const environment = {
  production: true,
  NX_GATEWAY_API: "https://api-provider.dbh.dc.gov",
  NX_PORTAL_API: "https://api-portal.dbh.dc.gov",
  NX_AD_CLIENT_ID: process.env['NX_AD_CLIENT_ID_PROD'],
  NX_AD_TID: process.env['NX_AD_TID_PROD'],
};
