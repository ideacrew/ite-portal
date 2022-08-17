import { Component } from '@angular/core';
import { ProviderProfileService } from '../provider-profile.service';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  providerProfile$ = this.providerProfile.currentProvider$;

  constructor(private providerProfile: ProviderProfileService) {}
}
