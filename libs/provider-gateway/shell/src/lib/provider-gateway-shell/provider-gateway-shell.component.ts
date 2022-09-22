import { Component } from '@angular/core';
import { AuthService, TokenObject } from '@dbh/auth';

@Component({
  templateUrl: './provider-gateway-shell.component.html',
  styleUrls: ['./provider-gateway-shell.component.scss'],
})
export class ProviderGatewayShellComponent {
  token: TokenObject = this.authService.decodedToken;

  isProvider = this.authService.isProvider;
  isDBHUser = this.authService.isDBHUser;

  applicationName = 'Provider Gateway';

  constructor(private authService: AuthService) {}
}
