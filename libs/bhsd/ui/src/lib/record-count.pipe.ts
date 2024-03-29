import { Pipe, PipeTransform } from '@angular/core';

import { ExtractRecordValidation } from '@dbh/bhsd/data-access';

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

    const percentage = Math.round((recordCount / totalRecords) * 1000)/10;

    return form === 'absolute' ? recordCount : percentage;
  }
}
