/* eslint-disable unicorn/no-nested-ternary */
import { Pipe, PipeTransform } from '@angular/core';

import { ExtractRecordValidationV2 } from '@dbh/provider-extract/data-access';

@Pipe({
  name: 'recordSort',
})
export class RecordSortPipe implements PipeTransform {
  transform(records: ExtractRecordValidationV2[]): ExtractRecordValidationV2[] {
    const unsortedRecords = [...records];

    const sortedRecords = unsortedRecords.sort((recordA, recordB) => {
      const countOfRecordAFatalErrors = recordA.errors.filter(
        (error) => error.errorType === 'Fatal'
      ).length;
      const countOfRecordBFatalErrors = recordB.errors.filter(
        (error) => error.errorType === 'Fatal'
      ).length;

      return countOfRecordAFatalErrors > countOfRecordBFatalErrors ? -1 : 1;
    });

    return sortedRecords;
  }
}
