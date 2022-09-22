import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  baseApiUrl!: string;
  environment = 'local';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    const [urlEnvironment] = window.location.host.split('.');
    if (urlEnvironment.includes('dev') && !urlEnvironment.includes('uat')) {
      // this.baseApiUrl = `https://bff-dev.dbh-ite.com`;
      this.baseApiUrl = `https://ite-api.herokuapp.com`;
      this.environment = 'dev';
    } else if (urlEnvironment.includes('uat')) {
      // this.baseApiUrl = `https://bff-uat.dbh-ite.com`;
      this.baseApiUrl = `https://ite-api-staging.herokuapp.com`;
      this.environment = 'uat';
    } else {
      this.baseApiUrl = `https://ite-api.herokuapp.com`;
      this.environment = 'local';
    }
  }
}
