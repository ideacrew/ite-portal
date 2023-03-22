import { Pipe, PipeTransform } from '@angular/core';

import { ExtractRecordData } from '@dbh/bhsd/data-access';
import { getRecordIdentifier } from '@dbh/bhsd/util';

@Pipe({
  name: 'getRecordIdentifier',
})
export class GetRecordIdentifierPipe implements PipeTransform {
  transform(payload: ExtractRecordData): string {
    return getRecordIdentifier(payload);
  }
}
