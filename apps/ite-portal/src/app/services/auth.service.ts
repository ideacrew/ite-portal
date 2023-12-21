import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, fromEvent, Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';

// services
import { LastActiveService } from './last-active.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OurAuthService {
  public lsLoggedInKey = '__loggedIn';

  public _loggedIn: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  currentTime: string = new Date().toISOString();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalService: MsalService,
    private lastActiveService: LastActiveService
  ) {
    this._loggedIn = new BehaviorSubject(
      this.getLoggedInFromLocalStorage() ?? false
    );
    this.loggedIn$ = this._loggedIn.asObservable();
  }

  public login() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
        account: this.msalService.instance.getActiveAccount(),
        loginHint: this.msalService.instance.getActiveAccount()?.username,
      } as RedirectRequest);
    } else {
      this.msalService.loginRedirect().subscribe({
        error: (err: string) => new Error(err),
      });
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .pipe(filter((msg: AuthenticationResult) => msg.account !== undefined));
    } else {
      this.msalService.loginPopup().subscribe({
        error: (err: string) => new Error(err),
      });
    }
  }

  public logout(popup?: boolean) {
    if (popup) {
      this.msalService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.msalService.logoutRedirect().subscribe({
        error: (err: string) => new Error(err),
      });
    }
  }

  private getLoggedInFromLocalStorage(): boolean | null {
    const valueFromStorage = localStorage.getItem(this.lsLoggedInKey);
    if (!valueFromStorage) {
      return null;
    }

    return !!valueFromStorage;
  }

  private inactivityLogoutTimeoutS = environment.appInactiveTimeout;
  // private inactivityLogoutTimeoutS = 3000;
  private timerTickMs = 1000;

  public setUp() {
    timer(0, this.timerTickMs)
      .pipe(filter(() => this._loggedIn.value))
      .subscribe(() => {
        console.log('tick'); // for debugging
        const currentDate = moment(new Date());
        const lastActiveDate = this.lastActiveService.getLastActiveDate();
        if (
          moment.duration(currentDate.diff(lastActiveDate)).asSeconds() >
          this.inactivityLogoutTimeoutS
        ) {
          this.logout();
        }
      });

    // since we are here anyway it won't hurt to synchronize the login state between different tabs
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter(
          (event) =>
            event.storageArea === localStorage &&
            event.key === this.lsLoggedInKey
        ),
        map((event) => !!event.newValue)
      )
      .subscribe((loggedIn) => {
        this._loggedIn.next(loggedIn);
      });
  }
}
