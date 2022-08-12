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
    console.log({ urlEnv: urlEnvironment });

    if (
      urlEnvironment.includes('dbh-ite') &&
      !urlEnvironment.includes('staging')
    ) {
      this.baseApiUrl = `https://ite-api.herokuapp.com`;
      this.environment = 'dev;';
    } else if (urlEnvironment.includes('staging')) {
      console.log('Staging environment');
      this.baseApiUrl = `https://ite-api-staging.herokuapp.com`;
      this.environment = 'uat';
    } else {
      this.baseApiUrl = `https://ite-api.herokuapp.com`;
      this.environment = 'local';
    }

    console.log({ baseApiUrl: this.baseApiUrl, environment: this.environment });
  }
}
