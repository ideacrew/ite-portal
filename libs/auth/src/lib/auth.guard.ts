import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.rawToken) {
      return true;
    } else {
      void this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad(): boolean {
    if (this.auth.rawToken) {
      return true;
    } else {
      void this.router.navigate(['/login']);
      return false;
    }
  }
}
