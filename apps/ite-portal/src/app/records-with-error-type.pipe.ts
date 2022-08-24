import { Pipe, PipeTransform } from '@angular/core';

import {
  ErrorType,
  ExtractRecordValidation,
} from '@dbh/provider-extract/data-access';
import { getExtractRecordsByErrorType } from '@dbh/provider-extract/util';

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