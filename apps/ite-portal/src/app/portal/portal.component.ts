import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { AuthService, TokenObject } from '@dbh/auth';
import { ConfigService } from '@dbh/api-config';

type ProfileStatus = {
  token: string;
  status: string;
};
@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  token: TokenObject = this.authInternalService.decodedToken;

  isProvider = this.authInternalService.isProvider;
  isDBHUser = this.authInternalService.isDBHUser;

  applicationName = 'ITE Portal';
  email = '';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private config: ConfigService,
    private http: HttpClient,
    private authInternalService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.instance.getAllAccounts().length > 0) {
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

  // set provider details from the provider profile
  setProviderDetails(): void {
    this.http
      .get<ProfileStatus>(
        `${this.config.gatewayApiUrl}/api/v1/providers/provider_status`
      )
      .subscribe((result) => {
        this.setJwt(result.token);
      });
  }

  setJwt(currentToken: string): void {
    localStorage.setItem('__jwt_authorization_current_token', currentToken);
  }
}
