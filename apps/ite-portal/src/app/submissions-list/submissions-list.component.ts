import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ExtractSubmission,
  ProviderExtractService,
} from '@dbh/provider-extract/data-access';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  submissions$: Observable<ExtractSubmission[]> =
    this.providerExtractService.getSubmissions();

  constructor(private providerExtractService: ProviderExtractService) {}
}
