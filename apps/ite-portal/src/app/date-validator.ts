/* eslint-disable unicorn/no-null */
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
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
  console.log({
    controlObj: control,
    controlVal: control.value,
    cs: control,
  });

  const coverageStart = control.get('coverage_start');
  const coverageEnd = control.get('coverage_end');

  return coverageStart &&
    coverageEnd &&
    new Date(coverageStart.value) > new Date(coverageEnd.value)
    ? { startDateAfterEndDate: true }
    : null;
};
