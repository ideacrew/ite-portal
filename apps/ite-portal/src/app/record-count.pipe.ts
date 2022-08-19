/* eslint-disable unicorn/prevent-abbreviations */
import { Pipe, PipeTransform } from '@angular/core';
import { ExtractRecordValidation } from './submission-detail/submission-detail.component';

@Pipe({
  name: 'recordCount',
})
export class RecordCountPipe implements PipeTransform {
  transform(
    records: ExtractRecordValidation[],
    typeToCount: 'Pass' | 'Fail'
  ): unknown {
    return records.filter((record) => record.status === typeToCount).length;
  }
}
