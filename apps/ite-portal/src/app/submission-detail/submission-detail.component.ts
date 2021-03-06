import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

export interface ExtractDetail {
  _id: {
    $oid: string;
  };
  coverage_end: string; // e.g. "2022-02-01"
  coverage_start: string;
  created_at: string;
  extracted_on: string;
  file_name: string | null;
  file_type: string;
  provider_gateway_identifier: string;
  record_group: string;
  status: string | null;
  updated_at: string;
  records: ExtractRecord[];
}

export interface ExtractRecord {
  _id: {
    $oid: string;
  };
  created_at: string;
  failures: RecordFailure[];
  payload: Record<string, string | number | boolean>;
  status: 'Valid' | 'Invalid';
  updated_at: string;
  warnings: RecordFailure[];
}

type PropertyFailure = Record<string, string[]>;

export interface RecordFailure {
  client: PropertyFailure;
  extracted_on: ['must be a date'];
  last_contact_date: [
    {
      text: 'Should be included';
      warning: true;
    }
  ];
}

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
      this.http.get<ExtractDetail>(
        `https://ite-api.herokuapp.com/api/v1/extracts/${id ?? 'fake-value'}`
      )
    )
  );

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
}
