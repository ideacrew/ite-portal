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
import { getCsvBlob } from '@dbh/bhsd/util';
import { saveAs } from 'file-saver';

@Component({
  selector: 'dbh-submission-detail',
  templateUrl: './submission-detail.component.html',
  styleUrls: ['./submission-detail.component.scss'],
})
export class SubmissionDetailComponent {
  viewType: 'record' | 'dataField' = 'dataField';

  recordDefinition = `
    Record ID is a unique identifier composed of the combination the following key fields: Client ID, Admission Date, Record Type and Treatment Setting, separated by underscores.
  `;

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

  constructor(
    private route: ActivatedRoute,
    private bhsdService: BHSDService
  ) {}

  downloadFailedCsv(dataObject: object[], filename: string): void {
    let headers = Object.keys(dataObject[0]);
    headers = headers.filter(e => e !== 'errors' && e !== 'status');
    this.downloadCsv(dataObject, headers, filename);
  }

  downloadCsv(
    dataObject: object[],
    headerRow: string[],
    filename: string
  ): void {
    const data = getCsvBlob(dataObject, headerRow);
    saveAs(data, filename);
  }
}
