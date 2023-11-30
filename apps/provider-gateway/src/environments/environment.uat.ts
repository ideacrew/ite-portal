const subdomain = process.env['NX_B2C_SUBDOMAIN_UAT'] || '';
const clientId = process.env['NX_GATEWAY_C_ID_UAT'] || '';
const gatewayApiUrl = 'https://api-provider.dbh.dc.gov';
const portalApiUrl = 'https://api-portal.dbh.dc.gov';
const authority = `https://${subdomain}.b2clogin.com/${subdomain}.onmicrosoft.com/b2c_1_sign_in_1`;
const authorityDomain = `${subdomain}.b2clogin.com`;
// const appInactiveTimeout = 900; // 15 minutes
const appInactiveTimeout = 10; // 10 seconds

export const environment = {
  production: false,
  UAT: false,
  NX_GATEWAY_API: gatewayApiUrl,
  NX_PORTAL_API: portalApiUrl,
  B2C_SUBDOMAIN: subdomain,
  NX_GATEWAY_C_ID: clientId,
  clientId: clientId,
  subdomain: subdomain,

  msalConfig: {
    auth: {
      clientId: clientId,
      authority: authority,
      authorityDomain: authorityDomain,
    },
  },
  // apiConfig: {
  //   scopes: ['user.read'],
  //   uri: 'https://graph.microsoft.com/v1.0/me',
  // },
  // apiUrl: 'https://localhost:7103',
  appInactiveTimeout: appInactiveTimeout,
};
