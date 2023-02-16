import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Extracts, BHSDService } from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  responseDetails$: Observable<Extracts> = this.bhsdService.getSubmissions();

  isDBHUser = this.authService.isDBHUser;

  constructor(
    private bhsdService: BHSDService,
    private authService: AuthService
  ) {}
}
