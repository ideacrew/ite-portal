import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { ConfigService } from './config.service';

export interface ProviderProfile {
  _id: {
    $oid: string;
  };
  is_active: boolean;
  adult_care: boolean;
  child_care: boolean;
  mh: boolean;
  npi: string;
  provider_gateway_identifier: string;
  provider_name: string;
  provider_nick_name: string;
  sud: boolean;
  created_at: string; // Date string
  updated_at: string; // Date string
  office_locations: OfficeLocation[];
  is_primary: boolean;
}

export interface Phone {
  area_code: string;
  extension: string;
  full_phone_number: string;
  number: string;
}

export interface OfficeLocation {
  address: {
    address_line1: string;
    address_line2: string;
    city: string;
    dc_ward: string;
    state: string;
    zip: string;
    created_at: string | null;
    updated_at: string | null;
  };
  phones: Phone[];
  emails: Email[];
}

export interface Email {
  address: string;
  created_at: string | null;
  updated_at: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProviderProfileService {
  currentProvider = new BehaviorSubject<ProviderProfile | undefined>(undefined);
  currentProvider$ = this.currentProvider.asObservable().pipe(shareReplay(1));

  constructor(private config: ConfigService, private http: HttpClient) {
    this.getProviderProfile();
  }

  getProviderProfile(): void {
    this.http
      .get<ProviderProfile[]>(`${this.config.baseApiUrl}/api/v1/providers`)
      .pipe(
        map((providers: ProviderProfile[]) => providers[0]),
        tap((provider: ProviderProfile) => this.currentProvider.next(provider))
      )
      .subscribe();
  }
}
