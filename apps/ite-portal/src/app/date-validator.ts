import { AbstractControl, ValidationErrors } from '@angular/forms';

export const dateNotInFuture = (
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
