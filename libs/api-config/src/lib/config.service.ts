import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // By default the gatewayApiUrl is set to azure pattern of urls
  gatewayApiUrl: string =
    process.env['NX_GATEWAY_API'] || 'https://api.provider.dbhite.com';
  portalApiUrl: string =
    process.env['NX_PORTAL_API'] || 'https://api.portal.dbhite.com';
  // baseUrl: string = this.getBaseUrl(window.location.hostname);
  // gatewayApiUrl: string = this.nxGatewayApi;
  // portalApiUrl = 'https://api.portal.dbhite.com';

  // constructor() {
  //   const [urlEnvironment] = window.location.host.split('.');
  //   const urlSlices = window.location.host.split('.');
  //   if (urlSlices.includes('dev')) {
  //     this.gatewayApiUrl = 'https://api.provider.dev.dbhite.com';
  //     this.portalApiUrl = 'https://api.portal.dev.dbhite.com';
  //   } else if (window.location.host.includes('localhost')) {
  //     this.gatewayApiUrl = 'http://localhost:4001';
  //     this.portalApiUrl = 'http://localhost:4000';
  //   } else if (!window.location.hostname.includes('dbhite')) {
  //     // for old aws deployments. this will be removed once fully migrated to azure.
  //     this.gatewayApiUrl = 'https://bff-dev.dbh-ite.com';
  //     this.portalApiUrl = 'https://portal-bff-dev.dbh-ite.com/';
  //     if (urlEnvironment.includes('uat')) {
  //       this.gatewayApiUrl = `https://bff-uat.dbh-ite.com`;
  //     }
  //     if (
  //       urlEnvironment === 'portal' ||
  //       urlEnvironment === 'provider-gateway'
  //     ) {
  //       this.gatewayApiUrl = `https://bff.dbh-ite.com`;
  //     }
  //   }
  // }

  // getBaseUrl(hostname: string) {
  //   const slices = hostname.split('.');
  //   slices.shift();
  //   return slices && Array.isArray(slices) ? slices.join('.') : '';
  // }
}
