/* eslint-disable unicorn/prevent-abbreviations */
import { Pipe, PipeTransform } from '@angular/core';
import { ExtractRecordValidation } from './submission-detail/submission-detail.component';

const errorMapping: Record<ErrorType, ErrorKey> = {
  Fatal: 'fatal_errors',
  Critical: 'critical_errors',
  Warning: 'warnings',
};

type ErrorType = 'Fatal' | 'Critical' | 'Warning';

type ErrorKey = 'fatal_errors' | 'critical_errors' | 'warnings';

@Pipe({
  name: 'errorCount',
})
export class ErrorCountPipe implements PipeTransform {
  transform(
    records: ExtractRecordValidation[],
    typeToCount: ErrorType
    // form: 'relative' | 'absolute' = 'absolute'
  ): number {
    const errorKey = errorMapping[typeToCount];

    const allErrorsOfType: number = records.flatMap(
      (record) => record[errorKey]
    ).length;

    return allErrorsOfType;
  }
}
