import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // By default the baseApiUrl is set to the dev api url
  baseApiUrl = 'http://localhost:4000';

  constructor() {
    // Only if the url contains uat or only the application name should we override the api url
    const [urlEnvironment] = window.location.host.split('.');

    if (urlEnvironment.includes('uat')) {
      this.baseApiUrl = `https://bff-uat.dbh-ite.com`;
    }

    if (urlEnvironment === 'portal' || urlEnvironment === 'provider-gateway') {
      this.baseApiUrl = `https://bff.dbh-ite.com`;
    }
  }
}
