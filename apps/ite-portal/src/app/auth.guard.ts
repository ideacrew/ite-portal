import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if (this.auth.rawToken) {
      return true;
    } else {
      void this.router.navigate(['/login']);
      return false;
    }
  }

  constructor(private auth: AuthService, private router: Router) {}
}
