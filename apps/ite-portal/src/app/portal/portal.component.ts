import { Component } from '@angular/core';

import { AuthService, TokenObject } from '@dbh/auth';

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent {
  token: TokenObject = this.authService.decodedToken;

  isProvider = this.authService.isProvider;
  isDBHUser = this.authService.isDBHUser;

  get applicationName(): string {
    return this.isProvider && !this.isDBHUser
      ? 'Provider Gateway'
      : 'ITE Portal';
  }

  constructor(private authService: AuthService) {}
}
