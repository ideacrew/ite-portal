import { Pipe, PipeTransform } from '@angular/core';

import { ExtractRecordData } from './models';
import { getRecordIdentifier } from './util';

@Pipe({
  name: 'getRecordIdentifier',
})
export class GetRecordIdentifierPipe implements PipeTransform {
  transform(payload: ExtractRecordData): string {
    return getRecordIdentifier(payload);
  }
}
