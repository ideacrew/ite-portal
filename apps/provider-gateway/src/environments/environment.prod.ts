/* eslint-disable @typescript-eslint/naming-convention */

const subdomain = process.env['NX_B2C_SUBDOMAIN'] || '';
const clientId = process.env['NX_GATEWAY_C_ID_PROD'] || '';

export const environment = {
  production: true,
  UAT: false,
  NX_GATEWAY_API: 'https://provider-gateway-api.dbh.dc.gov',
  NX_PORTAL_API: 'https://ite-api.dbh.dc.gov',
  B2C_SUBDOMAIN: process.env['NX_B2C_SUBDOMAIN_PROD'],
  NX_GATEWAY_C_ID: clientId,
  subdomain: subdomain,

  msalConfig: {
    auth: {
      clientId: clientId,
      authority: `https://${subdomain}.b2clogin.com/${subdomain}.onmicrosoft.com/b2c_1_sign_in_1`,
    },
  },
  // apiConfig: {
  //   scopes: ['user.read'],
  //   uri: 'https://graph.microsoft.com/v1.0/me',
  // },
  // apiUrl: 'https://localhost:7103',
  // appInactiveTimeout: 900, // 15 minutes
  appInactiveTimeout: 10, // 10 seconds
};
