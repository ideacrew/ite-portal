/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

export type PasswordResetForm = {
  current_password: FormControl<string | null>;
  password: FormControl<string | null>;
  password_confirmation: FormControl<string | null>;
};
@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  private result = new Subject<string | null>();
  result$ = this.result.asObservable();

  showPassword = false;
  passwordForm!: FormGroup<PasswordResetForm>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      current_password: this.fb.control('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
        // ),
      ]),
      password: this.fb.control('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
        // ),
      ]),
      password_confirmation: this.fb.control('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
        // ),
      ]),
    });
  }

  resetPassword(): void {
    if (this.passwordForm.status === 'VALID') {
      const { current_password, password, password_confirmation } =
        this.passwordForm.value;
      if (current_password && password && password_confirmation) {
        this.authService
          .resetPassword({ current_password, password, password_confirmation })
          .subscribe({
            error: (message: HttpErrorResponse) => {
              this.result.next(String(message.error));
            },
            complete: () => {
              void this.router.navigate(['/provider-gateway']);
            },
          });
      }
    }
  }
}
