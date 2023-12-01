import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  InteractionStatus,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MessagesComponent } from './messages/messages.component';
import { LastActiveComponent } from './last-active/last-active.component';
import { OurAuthService } from './services/auth.service';
import { LastActiveService } from './services/last-active.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <a class="title" href="/">{{ title }}</a>

      <div class="toolbar-spacer"></div>

      <a mat-button [routerLink]="['profile']">Profile</a>

      <button
        mat-raised-button
        [matMenuTriggerFor]="loginMenu"
        *ngIf="!loginDisplay"
      >
        Login
      </button>
      <mat-menu #loginMenu="matMenu">
        <button mat-menu-item (click)="loginRedirect()">
          Login using Redirect
        </button>
        <button mat-menu-item (click)="loginPopup()">Login using Popup</button>
      </mat-menu>

      <button
        mat-raised-button
        [matMenuTriggerFor]="logoutMenu"
        *ngIf="loginDisplay"
      >
        Logout
      </button>
      <mat-menu #logoutMenu="matMenu">
        <button mat-menu-item (click)="logout()">Logout using Redirect</button>
        <button mat-menu-item (click)="logout(true)">Logout using Popup</button>
      </mat-menu>
    </mat-toolbar>
    <div class="container">
      <!--This is to avoid reload during acquireTokenSilent() because of hidden iframe -->
      <last-active></last-active>
      <messages></messages>
      <router-outlet *ngIf="!isIframe"></router-outlet>
    </div>
  `,
  styles: [
    `
      .toolbar-spacer {
        flex: 1 1 auto;
      }

      a.title {
        color: white;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MessagesComponent,
    LastActiveComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Standalone Sample - MSAL Angular v3';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private ourAuthService: OurAuthService,
    private lastActiveService: LastActiveService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();

    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
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
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }

    if (activeAccount) {
      console.log('We are logged in');
      localStorage.setItem(this.ourAuthService.lsLoggedInKey, 'true');
      this.ourAuthService._loggedIn.next(true);
    } else {
      console.log('We are not logged in');
      localStorage.removeItem(this.ourAuthService.lsLoggedInKey);
      localStorage.removeItem(this.lastActiveService.lsLastActiveKey);
      if (this.ourAuthService._loggedIn === undefined) {
        return;
      }
      this.ourAuthService._loggedIn.next(false);
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

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
