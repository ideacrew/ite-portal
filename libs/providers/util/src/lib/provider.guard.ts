import { Injectable } from '@angular/core';


import { AuthService } from '@dbh/auth';

@Injectable({
  providedIn: 'root',
})
export class ProviderGuard  {
  canLoad(): boolean {
    return this.auth.isProvider;
  }

  constructor(private auth: AuthService) {}
}
