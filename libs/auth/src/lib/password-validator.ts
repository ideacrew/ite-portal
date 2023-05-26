/* eslint-disable unicorn/no-null */
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { UserLoginForm } from './log-in/log-in.component';
import { ResetForgottenPasswordForm } from './reset-forgotten-password/reset-forgotten-password.component';

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

export const passwordsMatch: ValidatorFn = (
  control: AbstractControl<FormGroup<ResetForgottenPasswordForm>>
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');
  if (passwordConfirmation && password) {
    return String(password.value) !== String(passwordConfirmation.value)
      ? { passwordsMatch: true }
      : null;
  } else {
    return null;
  }
};
