import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  email = '';
  provider = false;
  providerGatewayId = '';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    if (this.authService.instance.getAllAccounts().length > 0) {
      const account = this.authService.instance.getAllAccounts()[0];
      if (account) {
        this.email = account['username'];
        if (account['idTokenClaims']) {
          const id = account['idTokenClaims']['extension_ProviderGatewayIdentifier'] || '';
          if (id !== '') {
            console.log(String(id));
            this.provider = true;
            this.providerGatewayId = String(id);
          }
        }
      }
    }
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
