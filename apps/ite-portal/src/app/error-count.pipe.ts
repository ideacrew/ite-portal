/* eslint-disable unicorn/prevent-abbreviations */
import { Pipe, PipeTransform } from '@angular/core';

import {
  ExtractRecordValidation,
  ValidationCategory,
  Validation,
  ValidationMessage,
  ErrorType,
  errorMapping,
} from './models';

@Pipe({
  name: 'errorCount',
})
export class ErrorCountPipe implements PipeTransform {
  transform(
    records: ExtractRecordValidation[],
    typeToCount: ErrorType,
    category?: ValidationCategory
    // form: 'relative' | 'absolute' = 'absolute'
  ): number {
    const errorKey = errorMapping[typeToCount];

    const allErrorsOfType: Validation[] = records.flatMap(
      (record) => record[errorKey]
    );

    let categoryCount = 0;
    if (category) {
      for (const error of allErrorsOfType) {
        for (const prop in error) {
          const message: ValidationMessage | undefined =
            error[prop as keyof Validation];
          if (message?.category === category) {
            categoryCount++;
          }
        }
      }
    }

    return category ? categoryCount : allErrorsOfType.length;
  }
}
