const clientId = process.env['NX_AD_CLIENT_ID_PROD'] || '';
const tenantId = process.env['NX_AD_TID_PROD'] || '';
const gatewayApiUrl = process.env['NX_GATEWAY_API_PROD'] || '';
const portalApiUrl = process.env['NX_PORTAL_API_PROD'] || '';
const authority = `https://login.microsoftonline.com/${tenantId}/`;
const appInactiveTimeout = 900; // 15 minutes

export const environment = {
  production: true,
  UAT: false,
  NX_AD_CLIENT_ID: clientId,
  NX_AD_TID: tenantId,
  NX_GATEWAY_API: gatewayApiUrl,
  NX_PORTAL_API: portalApiUrl,
  msalConfig: {
    auth: {
      clientId: clientId,
      authority: authority,
    },
  },
  apiConfig: {
    uri: authority,
  },
  appInactiveTimeout: appInactiveTimeout,
};
