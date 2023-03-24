/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
import { ClientSearch, ClaimSearch } from './models';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  constructor(private config: ConfigService, private http: HttpClient) {}

  clientSearch(search: string): Observable<ClientSearch> {
    return this.http.get<ClientSearch>(
      `${this.config.portalApiUrl}/claims/master_clients?search=${search}`
    );
  }

  claimSearch(search: string): Observable<ClaimSearch> {
    return this.http.get<ClaimSearch>(
      `${this.config.portalApiUrl}/claims/master_claims?search=${search}`
    );
  }
}
