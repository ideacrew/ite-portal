/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@dbh/api-config';
import {
  ClientSearch,
  ClaimSearch,
  Claim,
  ClientSearchResult,
  Criterion,
  ValueOption,
} from './models';
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

  claimSearch(search: string, offset: number): Observable<ClaimSearch> {
    return this.http.get<ClaimSearch>(
      `${this.config.portalApiUrl}/claims/master_claims?search=${search}&offset=${offset}`
    );
  }

  advancedClaimSearch(
    criteria: Criterion[],
    offset: number
  ): Observable<ClaimSearch> {
    let baseUrl = `${this.config.portalApiUrl}/claims/master_claims/advanced_search?offset=${offset}&`;
    for (const [index, criterion] of criteria.entries()) {
      baseUrl += `criteria_selector[${index}]=${criterion.selector ?? ''}&`;
      baseUrl += `criteria_relative[${index}]=${criterion.relative ?? ''}&`;
      baseUrl += `criteria_value[${index}]=${criterion.value ?? ''}&`;
      baseUrl += `criteria_value_type[${index}]=${criterion.valueType ?? ''}&`;
      console.log(baseUrl);
    }
    return this.http.get<ClaimSearch>(baseUrl);
  }

  getProviderTypes(): Observable<ValueOption[]> {
    return this.http.get<ValueOption[]>(
      `${this.config.portalApiUrl}/claims/master_claims/provider_types`
    );
  }

  getProcedureCodes(): Observable<ValueOption[]> {
    return this.http.get<ValueOption[]>(
      `${this.config.portalApiUrl}/claims/master_claims/procedure_codes`
    );
  }

  getClaim(id: string): Observable<Claim> {
    return this.http.get<Claim>(
      `${this.config.portalApiUrl}/claims/master_claims/${id}`
    );
  }

  getClient(id: string): Observable<ClientSearchResult> {
    return this.http.get<ClientSearchResult>(
      `${this.config.portalApiUrl}/claims/master_clients/${id}`
    );
  }

  getClientClaims(id: string): Observable<Claim[]> {
    return this.http.get<Claim[]>(
      `${this.config.portalApiUrl}/claims/master_clients/claim_history?id=${id}`
    );
  }
}
