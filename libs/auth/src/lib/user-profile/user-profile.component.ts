import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  email = this.authService.email;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
