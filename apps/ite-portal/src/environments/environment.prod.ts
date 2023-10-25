/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/naming-convention */

export const environment = {
  production: true,
  gatewayApi: 'https://api-provider.dbh.dc.gov',
  portalApi: 'https://api-portal.dbh.dc.gov',
  adClientId: process.env['NX_AD_CLIENT_ID_PROD'],
  adTid: process.env['NX_AD_TID_PROD'],
};
