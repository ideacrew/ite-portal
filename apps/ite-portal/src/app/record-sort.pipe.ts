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

      const countOfRecordACriticalErrors = recordA.errors.filter(
        (error) => error.errorType === 'Critical'
      ).length;
      const countOfRecordBCriticalErrors = recordB.errors.filter(
        (error) => error.errorType === 'Critical'
      ).length;

      const countOfWarningsA = recordA.errors.filter(
        (error) => error.errorType === 'Warning'
      ).length;
      const countOfWarningsB = recordB.errors.filter(
        (error) => error.errorType === 'Warning'
      ).length;

      // If fatal error counts are equal, use critical errors, but if those are the same
      // use warnings to determine order
      if (countOfRecordAFatalErrors === countOfRecordBFatalErrors) {
        if (countOfRecordACriticalErrors === countOfRecordBCriticalErrors) {
          return countOfWarningsA > countOfWarningsB ? -1 : 1;
        } else {
          return countOfRecordACriticalErrors > countOfRecordBCriticalErrors
            ? -1
            : 1;
        }
      } else {
        return countOfRecordAFatalErrors > countOfRecordBFatalErrors ? -1 : 1;
      }
    });

    return sortedRecords;
  }
}
