import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ExtractRecordValidationV2,
  ExtractSubmissionResponseV2,
  BHSDService,
} from '@dbh/bhsd/data-access';
import {
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';

interface VM {
  submission: ExtractSubmissionResponseV2;
  record: ExtractRecordValidationV2 | undefined;
}

@Component({
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss'],
})
export class RecordDetailComponent {
  submissionResponse$: Observable<ExtractSubmissionResponseV2> =
    this.route.paramMap.pipe(
      filter((parameters: ParamMap) => parameters.has('id')),
      map((parameters: ParamMap) => parameters.get('id')),
      switchMap((id: string | null) =>
        this.bhsdService.getExtractSubmissionV2(id ?? 'fake-value')
      ),
      shareReplay(1)
    );

  recordId$: Observable<string | null> = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('recordId')),
    map((parameters: ParamMap) => parameters.get('recordId'))
  );

  vm$: Observable<VM> = combineLatest({
    recordId: this.recordId$,
    submissionResponse: this.submissionResponse$,
  }).pipe(
    map(({ recordId, submissionResponse }) => {
      const records = submissionResponse.records;
      const matchingRecord = records.find(
        (record) => record._id.$oid === recordId
      );

      return { record: matchingRecord, submission: submissionResponse };
    })
  );

  constructor(
    private route: ActivatedRoute,
    private bhsdService: BHSDService
  ) {}
}
