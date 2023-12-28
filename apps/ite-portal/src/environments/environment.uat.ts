const clientId = process.env['NX_AD_CLIENT_ID_UAT'] || '';
const tenantId = process.env['NX_AD_TID_UAT'] || '';
const gatewayApiUrl = process.env['NX_GATEWAY_API_UAT'] || '';
const portalApiUrl = process.env['NX_PORTAL_API_UAT'] || '';
const authority = `https://login.microsoftonline.com/${tenantId}/`;
const appInactiveTimeout = 900; // 15 minutes

export const environment = {
  production: true,
  UAT: true,
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
