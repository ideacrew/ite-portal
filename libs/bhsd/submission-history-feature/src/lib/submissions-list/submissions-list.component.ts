import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ExtractSubmission, BHSDService } from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  submissions$: Observable<ExtractSubmission[]> =
    this.bhsdService.getSubmissions();

  isDBHUser = this.authService.isDBHUser;

  constructor(
    private bhsdService: BHSDService,
    private authService: AuthService
  ) {}
}
