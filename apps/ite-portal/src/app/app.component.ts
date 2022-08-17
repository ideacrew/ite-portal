/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/unbound-method */
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ProviderProfile,
  ProviderProfileService,
} from './provider-profile.service';

@Component({
  selector: 'dbh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  test!: boolean;

  profileName$: Observable<string> = this.providerProfile.currentProvider$.pipe(
    map((profile: ProviderProfile) => profile.provider_name)
  );

  constructor(private providerProfile: ProviderProfileService) {}
}
