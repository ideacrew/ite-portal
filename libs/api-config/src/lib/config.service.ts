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
    if (
      urlEnvironment.includes('portal-dev') &&
      !urlEnvironment.includes('portal-uat')
    ) {
      this.baseApiUrl = `https://bff-dev.dbh-ite.com/extracts`;
      this.environment = 'dev';
    } else if (urlEnvironment.includes('portal-uat')) {
      this.baseApiUrl = `https://bff-uat.dbh-ite.com/extracts`;
      this.environment = 'uat';
    } else {
      this.baseApiUrl = `https://bff-dev.dbh-ite.com/extracts`;
      this.environment = 'local';
    }
  }
}
