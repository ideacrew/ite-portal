import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ExtractSubmission,
  ProviderExtractService,
} from '@dbh/provider-extract/data-access';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  submissions$: Observable<ExtractSubmission[]> =
    this.providerExtractService.getSubmissions();

  isDBHUser = this.authService.isDBHUser;

  constructor(
    private providerExtractService: ProviderExtractService,
    private authService: AuthService
  ) {}
}
