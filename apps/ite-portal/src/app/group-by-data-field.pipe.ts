import { Pipe, PipeTransform } from '@angular/core';
import {
  ErrorType,
  ExtractRecordValidation,
  IssuesByDataField,
} from './models';

@Pipe({
  name: 'groupByDataField',
})
export class GroupByDataFieldPipe implements PipeTransform {
  transform(records: ExtractRecordValidation[], typeToCheck: ErrorType): null {
    return null;
  }
}
