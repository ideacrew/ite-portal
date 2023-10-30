import { MsalService } from '@azure/msal-angular';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MsalGuard implements CanActivate {
  constructor(private msalService: MsalService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.msalService.instance.getActiveAccount() !== undefined
      ? true
      : false;
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.msalService.instance.getActiveAccount() !== undefined
      ? true
      : false;
  }
}
