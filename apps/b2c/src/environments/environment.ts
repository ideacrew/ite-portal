// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '37678051-8925-41c9-b29a-4f4b58165f58',
      authority:
        'https://login.microsoftonline.com/8c3c4b1e-9b0a-4b1a-8b7a-5b5c9d9b1b8e',
    },
  },
  apiConfig: {
    scopes: [],
    uri: '',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
