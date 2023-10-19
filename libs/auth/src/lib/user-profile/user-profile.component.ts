import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  email = '';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    const account = this.authService.instance.getActiveAccount();
    console.log(account);
    console.log(this.authService.instance.getActiveAccount());
    if (this.authService.instance.getAllAccounts().length > 0) {
      console.log('got accounts');
      this.email = this.authService.instance.getAllAccounts()[0]['username'];
    }
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
