import { Pipe, PipeTransform } from '@angular/core';
import { getExtractRecordsByErrorType } from './get-issues-by-data-field';
import {
  ErrorType,
  ExtractRecordValidation,
} from './models';

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
