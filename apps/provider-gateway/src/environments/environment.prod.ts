/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
  production: true,
  UAT: false,
  NX_GATEWAY_API: 'https://provider-gateway-api.dbh.dc.gov',
  NX_PORTAL_API: 'https://ite-api.dbh.dc.gov',
  B2C_SUBDOMAIN: process.env['NX_B2C_SUBDOMAIN_PROD'],
  NX_GATEWAY_C_ID: process.env['NX_GATEWAY_C_ID_PROD'],
};
