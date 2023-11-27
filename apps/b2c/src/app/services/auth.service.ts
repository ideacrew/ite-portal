import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, fromEvent, Observable, timer } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
  EventMessage,
  EventType,
} from '@azure/msal-browser';

// services
import { MessageService } from './message.service';
// import { ApiService } from 'src/app/shared/services/api.service';
import { LastActiveService } from './last-active.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public lsLoggedInKey = '__loggedIn';

  private _loggedIn: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  currentTime: string = new Date().toISOString();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    // private apiService: ApiService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private messageService: MessageService,
    private lastActiveService: LastActiveService,
    private router: Router
  ) {
    this._loggedIn = new BehaviorSubject(
      this.getLoggedInFromLocalStorage() ?? false
    );
    this.loggedIn$ = this._loggedIn.asObservable();
  }

  public login() {
    // return this.apiService.login(username, password).pipe(
    //   tap(() => {
    //     localStorage.setItem(this.lsLoggedInKey, 'true');
    //     this._loggedIn.next(true);
    //   }),
    //   tap(() => {
    //     this.router.navigate(['/dashboard']);
    //   })
    // );
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
      // .subscribe((response) => {
      //   console.log('Hit 1');
      //   localStorage.setItem(this.lsLoggedInKey, 'true');
      //   this._loggedIn.next(true);
      //   this.router.navigate(['/dashboard']);
      // });
    } else {
      this.msalService.loginRedirect().subscribe((response) => {
        console.log('Hit 2');
        localStorage.setItem(this.lsLoggedInKey, 'true');
        this._loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      });
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
        )
        .subscribe((result) => {
          console.log('Hit 1');
        });
      // .subscribe((response: AuthenticationResult) => {
      //   this.msalService.instance.setActiveAccount(response.account);
      //   localStorage.setItem(this.lsLoggedInKey, 'true');
      //   this._loggedIn.next(true);
      //   this.router.navigate(['/dashboard']);
      // });
    } else {
      this.msalService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
          localStorage.setItem(this.lsLoggedInKey, 'true');
          this._loggedIn.next(true);
          this.router.navigate(['/dashboard']);
        });
    }
  }

  public logout(popup?: boolean) {
    // this.apiService.logout();
    // localStorage.removeItem(this.lsLoggedInKey);
    // localStorage.removeItem(this.lastActiveService.lsLastActiveKey);
    // if (this._loggedIn === undefined) {
    //   return;
    // }
    // this._loggedIn.next(false);
    // this.router.navigate(['/auth/login']);
    if (popup) {
      this.msalService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.msalService.logoutRedirect().subscribe(() => {
        console.log('Logged out hit');
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
  private timerTickMs = 1000;

  public setUp() {
    this.log('setUp');
    timer(0, this.timerTickMs)
      .pipe(filter(() => this._loggedIn.value))
      .subscribe(() => {
        const currentDate = moment(new Date());
        const lastActiveDate = this.lastActiveService.getLastActiveDate();
        if (
          moment.duration(currentDate.diff(lastActiveDate)).asSeconds() >
          this.inactivityLogoutTimeoutS
        ) {
          // this.logout();
          window.location.reload();
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
