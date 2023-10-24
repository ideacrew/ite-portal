// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/* eslint-disable @typescript-eslint/naming-convention */

export const environment = {
  production: false,
  NX_GATEWAY_API: 'https://api.provider.dev.dbhite.com',
  NX_PORTAL_API: 'https://api.portal.dev.dbhite.com',
  adClientId: process.env['NX_AD_CLIENT_ID'],
  adTid: process.env['NX_AD_TID'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
