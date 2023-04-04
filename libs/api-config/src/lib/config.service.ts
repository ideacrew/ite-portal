import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // By default the gatewayApiUrl is set to the dev api url
  //gatewayApiUrl = 'http://localhost:4001';
  gatewayApiUrl = 'https://bff-dev.dbh-ite.com';
  //portalApiUrl = 'http://localhost:4000';
  portalApiUrl = 'https://portal-bff-dev.dbh-ite.com/'

  constructor() {
    // Only if the url contains uat or only the application name should we override the api url
    const [urlEnvironment] = window.location.host.split('.');

    if (urlEnvironment.includes('uat')) {
      this.gatewayApiUrl = `https://bff-uat.dbh-ite.com`;
    }

    if (urlEnvironment === 'portal' || urlEnvironment === 'provider-gateway') {
      this.gatewayApiUrl = `https://bff.dbh-ite.com`;
    }
  }
}
