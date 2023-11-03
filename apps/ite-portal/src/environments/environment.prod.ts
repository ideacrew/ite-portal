/* eslint-disable @typescript-eslint/naming-convention */

export const environment = {
  production: true,
  gatewayApi: 'https://api-provider.dbh.dc.gov',
  portalApi: 'https://api-portal.dbh.dc.gov',
  NX_AD_CLIENT_ID: process.env['NX_AD_CLIENT_ID_PROD'],
  NX_AD_TID_PROD: process.env['NX_AD_TID_PROD'],
};
