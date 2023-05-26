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
import { AuthService } from '../auth.service';

export type UserForgotPasswordForm = {
  email: FormControl<string | null>;
};
@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private sendingData = new BehaviorSubject(false);
  sendingData$ = this.sendingData.asObservable().pipe(shareReplay(1));

  private result = new Subject<string | null>();
  result$ = this.result.asObservable();

  userForm!: FormGroup<UserForgotPasswordForm>;
  errorMessage = false;
  resetPasswordSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(APP_TITLE) public appTitle: string
  ) {
    this.userForm = this.fb.group({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
    this.userForm.valueChanges.subscribe(() => {
      this.errorMessage = false;
      this.resetPasswordSuccess = false;
    });
  }

  resetPassword(): void {
    if (this.userForm.status === 'VALID') {
      const { email } = this.userForm.value;
      console.log(this.userForm.value);
      if (email) {
        this.authService.forgotPassword(email).subscribe({
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
