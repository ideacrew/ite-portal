import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, EMPTY, of, Subject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { ProviderExtractService } from '@dbh/provider-extract/data-access';
import { passwordDoesNotContainEmail } from '../password-validator';

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
  title = 'ite-portal';
  sendingData = new BehaviorSubject(false);
  sendingData$ = this.sendingData.asObservable().pipe(shareReplay(1));
  result = new Subject<string | null>();
  result$ = this.result.asObservable();

  userForm!: FormGroup<UserLoginForm>;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private providerExtractService: ProviderExtractService
  ) {
    this.userForm = this.fb.group(
      {
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^a-zA-Zd ]).+'
          ),
        ]),
      },
      {
        validators: [passwordDoesNotContainEmail],
      }
    );
  }

  showPassword: boolean = false;
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  verifyUser(): void {
    if (this.userForm.status === 'VALID') {
      this.sendingData.next(true);
      this.result.next(null);
      this.providerExtractService
        .sendUser(this.userForm.value)
        .pipe(
          catchError((error: unknown) => {
            console.log('catchError', { error });
            this.result.next('Error signing in');
            return of(EMPTY);
          })
        )
        .subscribe({
          complete: () => {
            this.sendingData.next(false);
            this.result.next('verified user!');
          },
        });
    }
  }
}
