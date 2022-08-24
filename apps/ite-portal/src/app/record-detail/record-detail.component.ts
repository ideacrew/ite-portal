import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ExtractRecordValidationV2,
  ExtractSubmissionResponseV2,
  ProviderExtractService,
} from '@dbh/provider-extract/data-access';
import {
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';
import { ProviderProfileService } from '../provider-profile.service';

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
        this.providerExtractService.getExtractSubmissionV2(id ?? 'fake-value')
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
      const { records } = submissionResponse;
      const matchingRecord = records.find(
        (record) => record._id.$oid === recordId
      );

      return { record: matchingRecord, submission: submissionResponse };
    })
  );

  constructor(
    private route: ActivatedRoute,
    private providerExtractService: ProviderExtractService,
    private providerProfile: ProviderProfileService
  ) {}
}
