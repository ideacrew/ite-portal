import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  templateUrl: './ad-user-profile.component.html',
  styleUrls: ['./ad-user-profile.component.scss'],
})
export class AdUserProfileComponent implements OnInit {
  email = this.authService.instance.getAllAccounts()[0]['username'];

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.email = this.authService.instance.getAllAccounts()[0]['username'];
    }
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  }
}
