import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  ProviderProfile,
  ProviderProfileService,
} from '../provider-profile.service';

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent {
  profileName$: Observable<string | undefined> =
    this.providerProfile.currentProvider$.pipe(
      map((profile: ProviderProfile | undefined) => profile?.provider_name)
    );

  constructor(private providerProfile: ProviderProfileService) {}
}
