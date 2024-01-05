import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ConfigService } from '@dbh/api-config';

import { Provider } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProviderProfileService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getProviderProfile(id: string): Observable<Provider> {
    return this.http.get<Provider>(
      `${this.config.gatewayApiUrl}/api/v1/providers/${id}`
    );
  }
}
