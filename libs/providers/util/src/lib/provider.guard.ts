import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { AuthService } from '@dbh/auth';

@Injectable({
  providedIn: 'root',
})
export class ProviderGuard implements CanLoad {
  canLoad(): boolean {
    return this.auth.isProvider;
  }

  constructor(private auth: AuthService) {}
}
