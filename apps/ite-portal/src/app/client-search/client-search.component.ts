import { Component } from '@angular/core';

import { AuthService, TokenObject } from '@dbh/auth';

@Component({
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
})
export class ClientSearchComponent {
  token: TokenObject = this.authService.decodedToken;

  isProvider = this.authService.isProvider;
  isDBHUser = this.authService.isDBHUser;

  applicationName = 'ITE Portal';

  constructor(private authService: AuthService) {}
}
