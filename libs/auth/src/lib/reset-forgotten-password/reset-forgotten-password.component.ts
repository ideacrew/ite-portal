import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { APP_TITLE } from '@dbh/theme';
import { passwordsMatch } from '../password-validator';
import { AuthService } from '../auth.service';

export type ResetForgottenPasswordForm = {
  password: FormControl<string | null>;
  passwordConfirmation: FormControl<string | null>;
};
@Component({
  templateUrl: './reset-forgotten-password.component.html',
  styleUrls: ['./reset-forgotten-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetForgottenPasswordComponent {
  private sendingData = new BehaviorSubject(false);
  sendingData$ = this.sendingData.asObservable().pipe(shareReplay(1));

  private result = new Subject<string | null>();
  result$ = this.result.asObservable();

  userForm!: FormGroup<ResetForgottenPasswordForm>;
  errorMessage = false;
  resetPasswordSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(APP_TITLE) public appTitle: string
  ) {
    this.userForm = this.fb.group(
      {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        password: this.fb.control('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
          // ),
        ]),
        passwordConfirmation: this.fb.control('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
          // ),
        ]),
      },
      {
        validators: [passwordsMatch],
      }
    );
    this.userForm.valueChanges.subscribe(() => {
      this.errorMessage = false;
      this.resetPasswordSuccess = false;
    });
  }

  resetPassword(): void {
    if (this.userForm.status === 'VALID') {
      const { password, passwordConfirmation } = this.userForm.value;
      const token = '';
      const reset_password_token = Date.new();
      if (password && passwordConfirmation) {
        this.authService
          .resetForgottenPassword({ password, token, reset_password_token })
          .subscribe({
            next: () => {
              this.resetPasswordSuccess = true;
              setTimeout(() => {
                void this.router.navigate(['/login']);
              }, 10_000);
            },
            error: () => {
              this.errorMessage = true;
            },
          });
      }
    }
  }
}
