/* eslint-disable unicorn/no-null */
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { differenceInMonths } from 'date-fns';

import { ExtractTransmissionForm } from './app.component';

export const dateNotInFuture: ValidatorFn = (
  control: AbstractControl<string>
): ValidationErrors | null => {
  const dateAsEntered = new Date(control.value).getTime();

  const today = Date.now();

  if (today < dateAsEntered) {
    return { dateInFuture: true };
  }

  // eslint-disable-next-line unicorn/no-null
  return null;
};

export const startDateNotAfterEndDate: ValidatorFn = (
  control: AbstractControl<FormGroup<ExtractTransmissionForm>>
): ValidationErrors | null => {
  const coverageStart = control.get('coverage_start');
  const coverageEnd = control.get('coverage_end');

  return coverageStart &&
    coverageEnd &&
    new Date(coverageStart.value) > new Date(coverageEnd.value)
    ? { startDateAfterEndDate: true }
    : null;
};

export const coveragePeriodNotTooLong: ValidatorFn = (
  control: AbstractControl<FormGroup<ExtractTransmissionForm>>
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
  control: AbstractControl<FormGroup<ExtractTransmissionForm>>
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
