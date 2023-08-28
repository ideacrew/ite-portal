import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // By default the gatewayApiUrl is set to azure pattern of urls
  gatewayApiUrl = 'https://api.' + window.location.hostname;
  portalApiUrl = 'https://api.' + window.location.hostname;

  constructor() {
    // Only if the url contains uat or only the application name should we override the api url
    const [urlEnvironment] = window.location.host.split('.');
    // for local dev
    if (window.location.host.includes('localhost')) {
      this.gatewayApiUrl = 'http://localhost:4001';
      this.portalApiUrl = 'http://localhost:4000';
    } else if (!window.location.hostname.includes('dbhite')) {
      // for old aws urls. this will be removed once fully migrated to azure.
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
}
