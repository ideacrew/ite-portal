/* eslint-disable unicorn/prevent-abbreviations */
import { Pipe, PipeTransform } from '@angular/core';
import { ExtractRecordValidation } from './submission-detail/submission-detail.component';

@Pipe({
  name: 'recordCount',
})
export class RecordCountPipe implements PipeTransform {
  transform(
    records: ExtractRecordValidation[],
    typeToCount: 'Pass' | 'Fail',
    form: 'relative' | 'absolute' = 'absolute'
  ): number {
    const totalRecords = records.length;
    const recordCount = records.filter(
      (record) => record.status === typeToCount
    ).length;

    return form === 'absolute'
      ? recordCount
      : (recordCount / totalRecords) * 100;
  }
}
