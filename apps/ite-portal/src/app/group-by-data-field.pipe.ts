/* eslint-disable unicorn/no-null */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByDataField',
})
export class GroupByDataFieldPipe implements PipeTransform {
  transform(): null {
    return null;
  }
}
