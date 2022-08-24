import { Pipe, PipeTransform } from '@angular/core';

import {
  ErrorType,
  ExtractRecordValidation,
} from '@dbh/provider-extract/data-access';

import { getExtractRecordsByErrorType } from './get-issues-by-data-field';
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
