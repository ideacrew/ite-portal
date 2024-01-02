import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';

import { Provider, ProviderProfileService } from '@dbh/providers/data-access';

@Component({
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss'],
})
export class ProviderProfileComponent {
  profile$: Observable<Provider> = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.providerProfileService.getProviderProfile(id ?? 'fake-value')
    )
  );

  constructor(
    private providerProfileService: ProviderProfileService,
    private route: ActivatedRoute
  ) {}

  serviceType(profile: Provider): string {
    const { mh, sud } = profile;

    if (mh && sud) {
      return 'MH & SUD';
    }

    if (mh && !sud) {
      return 'MH';
    }

    if (!mh && sud) {
      return 'SUD';
    }

    return '';
  }
}
