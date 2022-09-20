import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ExtractSubmission, BHSDService } from '@dbh/bhsd/data-access';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  submissions$: Observable<ExtractSubmission[]> =
    this.BHSDService.getSubmissions();

  isDBHUser = this.authService.isDBHUser;

  constructor(
    private BHSDService: BHSDService,
    private authService: AuthService
  ) {}
}
