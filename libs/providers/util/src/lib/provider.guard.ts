import { Injectable } from '@angular/core';

import { AuthService } from '@dbh/auth';

@Injectable({
  providedIn: 'root',
})
export class ProviderGuard {
  constructor(private auth: AuthService) {}
  canLoad(): boolean {
    return this.auth.isProvider;
  }
}
