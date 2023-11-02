import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { differenceInMonths } from 'date-fns';

import { BHSDSubmissionForm } from './bhsd-submission-form';

export const dateNotInFuture: ValidatorFn = (
  control: AbstractControl<string>
): ValidationErrors | null => {
  const dateAsEntered = new Date(control.value).getTime();

  const today = Date.now();

  if (today < dateAsEntered) {
    return { dateInFuture: true };
  }

  return null;
};

export const startDateNotAfterEndDate: ValidatorFn = (
  control: AbstractControl<FormGroup<BHSDSubmissionForm>>
): ValidationErrors | null => {
  const coverageStart = control.get('coverage_start');
  const coverageEnd = control.get('coverage_end');

  return coverageStart &&
    coverageEnd &&
    compareDates(new Date(coverageStart.value), new Date(coverageEnd.value))
    ? { startDateAfterEndDate: true }
    : null;
};

export const compareDates = (date1: Date, date2: Date): boolean =>
  date1 > date2;

export const coveragePeriodNotTooLong: ValidatorFn = (
  control: AbstractControl<FormGroup<BHSDSubmissionForm>>
): ValidationErrors | null => {
  const coverageStart = control.get('coverage_start');
  const coverageEnd = control.get('coverage_end');

  if (coverageStart && coverageEnd) {
    const coverageStartDate = new Date(coverageStart.value);
    const coverageEndDate = new Date(coverageEnd.value);

    const coveragePeriodInMonths = differenceInMonths(
      coverageEndDate,
      coverageStartDate
    );

    return coveragePeriodInMonths > 12 ? { coveragePeriodTooLong: true } : null;
  } else {
    return null;
  }
};

export const extractDateWithinCoveragePeriod: ValidatorFn = (
  control: AbstractControl<FormGroup<BHSDSubmissionForm>>
): ValidationErrors | null => {
  const extractedOn = control.get('extracted_on');
  const coverageEnd = control.get('coverage_end');

  if (extractedOn && coverageEnd) {
    const dataExtractDate = new Date(extractedOn.value);
    const coverageEndDate = new Date(coverageEnd.value);

    return dataExtractDate < coverageEndDate
      ? { dataExtractedWithinCoveragePeriod: true }
      : null;
  } else {
    return null;
  }
};
