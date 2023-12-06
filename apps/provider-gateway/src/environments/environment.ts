// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const subdomain = process.env['NX_B2C_SUBDOMAIN'] || '';
const clientId = process.env['NX_GATEWAY_C_ID'] || '';
const gatewayApiUrl = 'https://api.provider.dev.dbhite.com';
const portalApiUrl = 'https://api.portal.dev.dbhite.com';
const authority = `https://${subdomain}.b2clogin.com/${subdomain}.onmicrosoft.com/b2c_1_sign_in_1`;
const authorityDomain = `${subdomain}.b2clogin.com`;
const appInactiveTimeout = 900; // 15 minutes
// const appInactiveTimeout = 10; // 10 seconds

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
  apiConfig: {
    scopes: ['provider.read'],
    uri: `https://${subdomain}.onmicrosoft.com/provider-api/`,
  },
  appInactiveTimeout: appInactiveTimeout,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
