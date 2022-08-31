import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
} from '@dbh/provider-extract/data-access';

import {
  ProviderProfile,
  ProviderProfileService,
} from '../provider-profile.service';

@Component({
  selector: 'dbh-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss'],
})
export class FileInformationComponent {
  providerName$: Observable<string | undefined> =
    this.providerProfileService.currentProvider$.pipe(
      map((provider: ProviderProfile | undefined) => provider?.provider_name)
    );
  @Input() submission!: ExtractSubmissionResponseV2 | ExtractSubmissionResponse;
  constructor(private providerProfileService: ProviderProfileService) {}
}
