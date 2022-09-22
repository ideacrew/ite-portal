import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { passwordDoesNotContainEmail } from '../password-validator';
import { AuthService } from '../auth.service';
import { APP_TITLE } from '@dbh/theme';

export interface UserLoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent {
  private sendingData = new BehaviorSubject(false);
  sendingData$ = this.sendingData.asObservable().pipe(shareReplay(1));

  private result = new Subject<string | null>();
  result$ = this.result.asObservable();

  showPassword = false;
  userForm!: FormGroup<UserLoginForm>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(APP_TITLE) public appTitle: string
  ) {
    this.userForm = this.fb.group(
      {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(
          //   '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
          // ),
        ]),
      },
      {
        validators: [passwordDoesNotContainEmail],
      }
    );
  }

  loginUser(): void {
    if (this.userForm.status === 'VALID') {
      const { email, password } = this.userForm.value;
      const formLocation = this.appTitle;
      if (email && password && formLocation) {
        this.authService.login({ email, password, formLocation }).subscribe({
          error: () => {
            this.result.next(
              'Invalid credentials, please contact your administrator if you need help.'
            );
          },
        });
      }
    }
  }
}
