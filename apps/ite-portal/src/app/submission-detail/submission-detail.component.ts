import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ConfigService } from '../config.service';
import {
  ProviderProfile,
  ProviderProfileService,
} from '../provider-profile.service';

export interface ExtractSubmissionResponse {
  _id: {
    $oid: string;
  };
  provider_id: {
    $oid: string;
  };
  coverage_end: string; // e.g. "2022-02-01"
  coverage_start: string;
  created_at: string;
  extracted_on: string;
  file_name: string | null;
  provider_gateway_identifier: string;
  records: ExtractRecordValidation[];
  status: string | null;
  updated_at: string;
}

export interface ExtractRecordValidation {
  _id: {
    $oid: string;
  };
  extract_id: {
    $oid: string;
  };
  created_at: string;
  critical_errors: Validation[];
  fatal_errors: Validation[];
  payload: ExtractRecordData;
  status: ValidationStatus;
  updated_at: string;
  warnings: Validation[];
}

export type Validation = Partial<
  Record<keyof ExtractRecordData, ValidationMessage>
>;

export interface ValidationMessage {
  text: string;
  category: ValidationCategory | null;
}

export const validationCategory = [
  'Data Inconsistency',
  'Invalid Field',
  'Invalid Field Length',
  'Invalid Value',
  'Missing Value',
  'Potential Error',
  'Wrong Format',
] as const;

export type ValidationCategory = typeof validationCategory[number];

export interface ExtractRecordData {
  // Key Fields
  admission_date: string;
  arrests_past_30days: string;
  client_id: string;
  collateral: string;
  dob: string;

  // Required Fields
  education: string;
  employment: string;
  episode_id: string;
  ethnicity: string;
  first_name: string;
  gender: string;
  last_contact_date: string;
  last_name: string;

  // Optional Fields
  num_of_prior_admissions: string;
  num_of_prior_episodes: string;
  primary_language: string;
  provider_id: string;
  race: string;
  record_type: string;
  treatment_type: string;
}

export type ValidationStatus = 'Pass' | 'Fail';

@Component({
  selector: 'dbh-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss'],
})
export class SubmissionDetailComponent {
  submission$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.http.get<ExtractSubmissionResponse>(
        `${this.config.baseApiUrl}/api/v1/extracts/${id ?? 'fake-value'}`
      )
    )
  );

  providerName$: Observable<string | undefined> =
    this.providerProfile.currentProvider$.pipe(
      map((provider: ProviderProfile | undefined) => provider?.provider_name)
    );

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private config: ConfigService,
    private providerProfile: ProviderProfileService
  ) {}
}
