import { Pipe, PipeTransform } from '@angular/core';

import {
  ErrorType,
  ExtractRecordValidation,
  getExtractRecordsByErrorType,
} from '@dbh/bhsd/data-access';

@Pipe({
  name: 'recordsWithErrorType',
})
export class RecordsWithErrorTypePipe implements PipeTransform {
  transform(
    records: ExtractRecordValidation[],
    typeToCount: ErrorType
  ): ExtractRecordValidation[] {
    return getExtractRecordsByErrorType(records, typeToCount);
  }
}
