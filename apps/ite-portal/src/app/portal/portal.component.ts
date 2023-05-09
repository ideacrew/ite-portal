import { Component, OnInit } from '@angular/core';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  isProvider = true;
  isDBHUser = true;

  applicationName = 'ITE Portal';
  email = '';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.email = this.authService.instance.getAllAccounts()[0]['username'];
    }
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (message: EventMessage) =>
            message.eventType === EventType.LOGIN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });
  }

  logUsers(): void {
    console.log(this.authService.instance.getAllAccounts());
  }

  logout() {
    // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200',
    });
  }
}
