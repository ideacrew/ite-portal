import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  baseApiUrl = `https://ite-api.herokuapp.com`;
  environment = 'local';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    console.log('Hello from config service constructor');
  }
}
