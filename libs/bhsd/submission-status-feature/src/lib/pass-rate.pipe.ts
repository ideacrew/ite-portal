import { Pipe, PipeTransform } from '@angular/core';

import { SubmissionStatus } from '@dbh/bhsd/data-access';
import { passRate } from '@dbh/bhsd/util';

@Pipe({
  name: 'passRate',
})
export class PassRatePipe implements PipeTransform {
  transform(submission: SubmissionStatus): string {
    return passRate(submission);
  }
}
