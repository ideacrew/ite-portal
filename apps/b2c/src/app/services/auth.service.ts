import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, fromEvent, Observable, timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';

// services
import { MessageService } from './message.service';
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
    private messageService: MessageService,
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
      this.msalService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .pipe(
          filter((msg: AuthenticationResult) => {
            console.log(msg);
            return msg.account !== undefined;
          })
        );
    } else {
      this.msalService.loginPopup();
    }
  }

  public logout(popup?: boolean) {
    if (popup) {
      this.msalService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.msalService.logoutRedirect();
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
  private timerTickMs = 1000;

  public setUp() {
    timer(0, this.timerTickMs)
      .pipe(filter(() => this._loggedIn.value))
      .subscribe(() => {
        this.log('tick');
        const currentDate = moment(new Date());
        const lastActiveDate = this.lastActiveService.getLastActiveDate();
        if (
          moment.duration(currentDate.diff(lastActiveDate)).asSeconds() >
          this.inactivityLogoutTimeoutS
        ) {
          this.logout();
          // window.location.reload();
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

  // Log a message with the MessageService
  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }
}
