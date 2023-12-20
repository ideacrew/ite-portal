// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const clientId = process.env['NX_AD_CLIENT_ID'] || '';
const tenantId = process.env['NX_AD_TID'] || '';
const gatewayApiUrl = process.env['NX_GATEWAY_API'] || '';
const portalApiUrl = process.env['NX_PORTAL_API'] || '';
// const appInactiveTimeout = 900; // 15 minutes
// const appInactiveTimeout = 10; // 10 seconds

export const environment = {
  production: false,
  UAT: false,
  NX_AD_CLIENT_ID: clientId,
  NX_AD_TID_PROD: tenantId,
  NX_GATEWAY_API: gatewayApiUrl,
  NX_PORTAL_API: portalApiUrl,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
