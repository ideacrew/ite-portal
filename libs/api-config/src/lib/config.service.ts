import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // By default the gatewayApiUrl is set to azure pattern of urls
  baseUrl = this.getBaseUrl();
  gatewayApiUrl = 'https://api.provider.' + this.baseUrl;
  portalApiUrl = 'https://api.portal.' + this.baseUrl;

  constructor() {
    // Only if the url contains uat or only the application name should we override the api url
    const [urlEnvironment] = window.location.host.split('.');
    // for local dev
    if (window.location.host.includes('localhost')) {
      this.gatewayApiUrl = 'http://localhost:4001';
      this.portalApiUrl = 'http://localhost:4000';
    } else if (!window.location.hostname.includes('dbhite')) {
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

  getBaseUrl() {
    const urlSlices = window.location.hostname.split('.');
    urlSlices.shift();
    return urlSlices.join('.');
  }
}
