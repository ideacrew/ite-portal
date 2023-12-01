import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AccountInfo,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { OurAuthService } from './services/auth.service';
import { LastActiveService } from './services/last-active.service';

@Component({
  selector: 'dbh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'provider-gateway';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  blar$ = this.ourAuthService.loggedIn$;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private ourAuthService: OurAuthService,
    private lastActiveService: LastActiveService
  ) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe(() => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });

    if (environment.UAT) {
      this.envBanner();
    }
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount();

    this.checkAccount(activeAccount);

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
      // This happens once when we are returned from msal login screen
      console.log('returned from login');
      if (this.authService.instance.getActiveAccount()) {
        this.checkAccount(accounts[0]);
      }
    }

    // if (activeAccount) {
    //   console.log('We are logged in');
    //   localStorage.setItem(this.ourAuthService.lsLoggedInKey, 'true');
    //   this.ourAuthService._loggedIn.next(true);
    // } else {
    //   console.log('We are not logged in');
    //   localStorage.removeItem(this.ourAuthService.lsLoggedInKey);
    //   localStorage.removeItem(this.lastActiveService.lsLastActiveKey);
    //   if (this.ourAuthService._loggedIn === undefined) {
    //     return;
    //   }
    //   this.ourAuthService._loggedIn.next(false);
    // }
  }

  private checkAccount(activeAccount: AccountInfo | null) {
    console.log('Checking the account now');
    if (activeAccount) {
      console.log('We have an active account');
    } else {
      console.log('We do not have an active account');
    }
  }

  loginRedirect() {
    this.ourAuthService.login();
  }

  loginPopup() {
    this.ourAuthService.loginPopup();
  }

  logout(popup?: boolean) {
    this.ourAuthService.logout(popup);
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  envBanner() {
    const banner = document.createElement('div');
    banner.classList.add('env-banner');
    banner.innerHTML = `<div>DBH BEHAVIORAL HEALTH SUPPLEMENTAL DATA (BHSD) TESTING SITE</div>`;
    document.body.prepend(banner);
  }
}
