import { Component } from '@angular/core';
import { AuthService, TokenObject } from '../auth.service';

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent {
  token: TokenObject = this.authService.decodedToken;

  constructor(private authService: AuthService) {}
}
