/* eslint-disable unicorn/no-null */
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { UserLoginForm } from './log-in/log-in.component';

export const passwordDoesNotContainEmail: ValidatorFn = (
  control: AbstractControl<FormGroup<UserLoginForm>>
): ValidationErrors | null => {
  const email = control.get('email');
  const password = control.get('password');
  if (email && password) {
    return String(password.value).includes(String(email.value))
      ? { passwordDoesNotContainEmail: true }
      : null;
  } else {
    return null;
  }
};
