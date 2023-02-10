import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';

import {
  convertExtractSubmissionToV2,
  convertExtractSubmissionToFailedCsv,
  convertExtractSubmissionToIssuesByRecord,
  ExtractSubmissionResponseV2,
  ExtractSubmissionResponseV3,
  BHSDService,
} from '@dbh/bhsd/data-access';
import {
  getReportingPeriod,
  getReportingPeriodText,
  getCsvBlob,
} from '@dbh/bhsd/util';
import { saveAs } from 'file-saver';

@Component({
  selector: 'dbh-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss'],
})
export class SubmissionDetailComponent {
  viewType: 'record' | 'dataField' = 'record';

  payloadFieldHeaders = [
    'address_city',
    'address_line1',
    'address_line2',
    'address_state',
    'address_ward',
    'address_zipcode',
    'admission_date',
    'admission_id',
    'arrests_past_30days_admission',
    'arrests_past_30days_discharge',
    'client_id',
    'co_occurring_sud_mh',
    'collateral',
    'criminal_justice_referral',
    'discharge_date',
    'discharge_reason',
    'dob',
    'education',
    'employment',
    'ethnicity',
    'first_name',
    'first_name_alt',
    'gaf_score_admission',
    'gaf_score_discharge',
    'gender',
    'health_insurance',
    'income_source',
    'last_contact_date',
    'last_name',
    'last_name_alt',
    'legal_status',
    'living_arrangement',
    'marital_status',
    'medicaid_id',
    'mh_dx1',
    'mh_dx2',
    'mh_dx3',
    'middle_name',
    'non_bh_dx1',
    'non_bh_dx2',
    'non_bh_dx3',
    'not_in_labor',
    'num_of_prior_su_episodes',
    'opioid_therapy',
    'phone1',
    'phone2',
    'pregnant',
    'primary_language',
    'primary_payment_source',
    'primary_su_age_at_first_use',
    'primary_su_frequency_admission',
    'primary_su_frequency_discharge',
    'primary_su_route',
    'primary_substance',
    'race',
    'record_type',
    'referral_source',
    'school_attendance',
    'secondary_su_age_at_first_use',
    'secondary_su_frequency_admission',
    'secondary_su_frequency_discharge',
    'secondary_su_route',
    'secondary_substance',
    'self_help_group_admission',
    'self_help_group_discharge',
    'service_request_date',
    'sexual_orientation',
    'smi_sed',
    'ssn',
    'sud_dx1',
    'sud_dx2',
    'sud_dx3',
    'suffix',
    'tertiary_su_age_at_first_use',
    'tertiary_su_frequency_admission',
    'tertiary_su_frequency_discharge',
    'tertiary_su_route',
    'tertiary_substance',
    'treatment_type',
    'veteran_status',
  ];

  thisReportingPeriod = getReportingPeriodText(getReportingPeriod(1));

  submission$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.bhsdService.getExtractSubmission(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  submissionV2$: Observable<ExtractSubmissionResponseV2> =
    this.submission$.pipe(
      map((submission) => convertExtractSubmissionToV2(submission))
    );

  submissionFailedRecords$: Observable<ExtractSubmissionResponseV3> =
    this.submissionV2$.pipe(
      map((submission) => convertExtractSubmissionToFailedCsv(submission))
    );

  submissionIssuesByRecords$: Observable<ExtractSubmissionResponseV3> =
    this.submissionV2$.pipe(
      map((submission) => convertExtractSubmissionToIssuesByRecord(submission))
    );

  failingDataFields$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.bhsdService.getExtractFailingDataFields(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  hasFailingDataFields = Array.isArray(this.failingDataFields$);

  constructor(
    private route: ActivatedRoute,
    private bhsdService: BHSDService
  ) {}

  downloadCsv(
    dataObject: object[],
    headerRow: string[],
    filename: string
  ): void {
    console.log(filename);
    const data = getCsvBlob(dataObject, headerRow);
    saveAs(data, filename);
  }
}
