import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // only these top two lines were needed when referencing the env files
  // however, that causes a circular dependency issue while linting.
  // gatewayApiUrl: string = environment.gatewayApi || '';
  // portalApiUrl: string = environment.portalApi || '';
  // By default the gatewayApiUrl is set to azure pattern of urls
  baseUrl: string = this.getBaseUrl(window.location.hostname);
  gatewayApiUrl = 'https://provider-gateway-api.dbh.dc.gov';
  portalApiUrl = 'https://ite-api.dbh.dc.gov';

  constructor() {
    const [urlEnvironment] = window.location.host.split('.');
    const urlSlices = window.location.host.split('.');
    if (window.location.host.includes('dev')) {
      this.gatewayApiUrl = 'https://api.provider.dev.dbhite.com';
      this.portalApiUrl = 'https://api.portal.dev.dbhite.com';
    } else if (window.location.host.includes('localhost')) {
      this.gatewayApiUrl = 'http://localhost:4001';
      this.portalApiUrl = 'http://localhost:4000';
    } else if (window.location.host === "provider.dbh.dc.gov" || window.location.host === "portal.dbh.dc.gov") {
      this.gatewayApiUrl = 'https://api-provider.dbh.dc.gov';
      this.portalApiUrl = 'https://api-portal.dbh.dc.gov';
    } else if (window.location.hostname.includes('dbh-ite')) {
      // for old aws deployments. this will be removed once fully migrated to azure.
      this.gatewayApiUrl = 'https://bff-dev.dbh-ite.com';
      this.portalApiUrl = 'https://portal-bff-dev.dbh-ite.com/';
      if (urlEnvironment.includes('uat')) {
        this.gatewayApiUrl = `https://bff-uat.dbh-ite.com`;
      }
      if (
        urlEnvironment === 'portal' ||
        urlEnvironment === 'provider-gateway'
      ) {
        this.gatewayApiUrl = `https://bff.dbh-ite.com`;
      }
    }
  }

  getBaseUrl(hostname: string) {
    const slices = hostname.split('.');
    slices.shift();
    return slices && Array.isArray(slices) ? slices.join('.') : '';
  }
}
