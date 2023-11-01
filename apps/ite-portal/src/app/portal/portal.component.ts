import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

import { ConfigService } from '@dbh/api-config';

type ProfileStatus = {
  providerStatus: boolean;
  dbhStatus: boolean;
  pgId?: string;
  pId?: string;
};
@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  isProvider = true;
  isDBHUser = true;
  isIframe = false;
  loginDisplay = false;
  applicationName = 'ITE Portal';
  email = '';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private config: ConfigService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.setLoginDisplay();
      this.email = this.authService.instance.getAllAccounts()[0]['username'];
      this.setProviderDetails();
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

  login() {
    console.log("clicked login!");
    this.authService.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  // set provider details from the provider profile
  setProviderDetails(): void {
    this.http
      .get<ProfileStatus>(
        `${this.config.gatewayApiUrl}/api/v1/providers/provider_status`
      )
      .subscribe((result) => {
        this.isProvider = result.providerStatus;
        this.isDBHUser = result.dbhStatus;
      });
  }
}
