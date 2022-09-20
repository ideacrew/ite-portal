import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '@dbh/auth';

@Injectable({
  providedIn: 'root',
})
export class ProviderGuard implements CanActivate {
  canActivate(): boolean {
    return this.auth.isProvider;
  }

  constructor(private auth: AuthService) {}
}
