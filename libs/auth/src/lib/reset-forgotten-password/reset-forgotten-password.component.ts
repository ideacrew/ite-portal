import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
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
  showPassword = false;
  resetPasswordForm!: FormGroup<ResetForgottenPasswordForm>;
  errorMessage = false;
  resetPasswordSuccess = false;
  resetToken$: Observable<string> = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('reset_token')),
    map((parameters: ParamMap) => parameters.get('reset_token') ?? 'fake-value')
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(APP_TITLE) public appTitle: string
  ) {
    this.resetPasswordForm = this.fb.group(
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
    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.errorMessage = false;
      this.resetPasswordSuccess = false;
    });
  }

  resetPassword(): void {
    if (this.resetPasswordForm.status === 'VALID') {
      const { password, passwordConfirmation } = this.resetPasswordForm.value;
      if (password && passwordConfirmation && this.resetToken$) {
        this.authService
          // eslint-disable-next-line @typescript-eslint/naming-convention
          .resetForgottenPassword({
            password: password,
            passwordConfirmation: this.resetToken$,
          })
          .subscribe({
            next: () => {
              this.resetPasswordSuccess = true;
              setTimeout(() => {
                void this.router.navigate(['/login']);
              }, 2000);
            },
            error: () => {
              this.errorMessage = true;
            },
          });
      }
    }
  }
}
