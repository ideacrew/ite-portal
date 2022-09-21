import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from '@dbh/api-config';
import { Observable } from 'rxjs';
import { ProviderProfile } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProviderProfileService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  getProviderProfile(id: string): Observable<ProviderProfile> {
    return this.http.get<ProviderProfile>(
      `${this.config.baseApiUrl}/api/v1/providers/${id}`
    );
  }
}
