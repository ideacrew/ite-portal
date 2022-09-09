/* eslint-disable unicorn/prevent-abbreviations */
import { Pipe, PipeTransform } from '@angular/core';

import { ExtractRecordValidation } from '@dbh/provider-extract/data-access';

@Pipe({
  name: 'recordCount',
})
export class RecordCountPipe implements PipeTransform {
  transform(
    records: ExtractRecordValidation[],
    typeToCount: 'Pass' | 'Fail',
    form: 'relative' | 'absolute' = 'absolute'
  ): number | string {
    const totalRecords = records.length;
    const recordCount = records.filter(
      (record) => record.status === typeToCount
    ).length;

    const percentage = ((recordCount / totalRecords) * 100).toFixed(1);

    return form === 'absolute' ? recordCount : percentage;
  }
}
