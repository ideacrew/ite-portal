import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { LastActiveService } from '../services/last-active.service';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'last-active',
  standalone: true,
  imports: [CommonModule, MomentModule],
  template: `
    <div *ngIf="lastActiveDate$ | async as lastActiveDate; else loading">
      <p>Last active {{ lastActiveDate | amTimeAgo }}.</p>
    </div>

    <ng-template #loading>
      <p>Initialising...</p>
    </ng-template>
  `,
})
export class LastActiveComponent {
  public lastActiveDate$: Observable<Date>;

  constructor(lastActiveService: LastActiveService) {
    this.lastActiveDate$ = lastActiveService.lastActive$;
  }
}
