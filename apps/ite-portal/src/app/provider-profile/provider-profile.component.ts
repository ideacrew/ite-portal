import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';

import {
  ProviderProfile,
  ProviderProfileService,
} from '../provider-profile.service';

@Component({
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss'],
})
export class ProviderProfileComponent {
  profile$: Observable<ProviderProfile> = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('providerId')),
    map((parameters: ParamMap) => parameters.get('providerId')),
    switchMap((id: string | null) =>
      this.providerProfileService.getProviderProfile(id ?? 'fake-value')
    )
  );

  constructor(
    private providerProfileService: ProviderProfileService,
    private route: ActivatedRoute
  ) {}
}
