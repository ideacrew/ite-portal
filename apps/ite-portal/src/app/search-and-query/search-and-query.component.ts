import { Component } from '@angular/core';

import { AuthService, TokenObject } from '@dbh/auth';

@Component({
  templateUrl: './search-and-query.component.html',
  styleUrls: ['./search-and-query.component.scss'],
})
export class SearchAndQueryComponent {
  token: TokenObject = this.authService.decodedToken;

  isProvider = this.authService.isProvider;
  isDBHUser = this.authService.isDBHUser;

  applicationName = 'ITE Portal';

  constructor(private authService: AuthService) {}
}
