import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BHSDService } from '@dbh/bhsd/data-access';
import { Observable, map } from 'rxjs';
import { UserLogins } from '@dbh/providers/data-access';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dbh-user-logins',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ul class="breadcrumbs">
      <li>
        <a routerLink="/executive-dashboards"> Executive Dashboards </a>
      </li>
      <li>User Logins</li>
    </ul>

    <h1>User Logins</h1>
    <div *ngIf="sortedLoggedUsers$ | async as results; else loading">
      <!-- TODO: Implement the following: -->
      <dl class="parent" *ngIf="false">
        <dt>Active User Accounts:</dt>
        <dd>
          {{ results.active_user_count }}
        </dd>
        <dt>Inactive User Accounts:</dt>
        <dd>
          {{ results.inactive_user_count }}
        </dd>
      </dl>
      <div>
        <button routerLink="/users/new">Create New User</button>
      </div>
      <h2>User Details</h2>
      <p>To view a user, click on a row in the table below.</p>

      <small>
        <span class="material-symbols-outlined"> info </span>
        All times are displayed in UTC
      </small>

      <table class="clickable-rows">
        <thead>
          <th>Provider Name</th>
          <th>Email</th>
          <th>Active</th>
          <th>Last Activity</th>
          <th>Provider Gateway Identifier</th>
        </thead>
        <tbody>
          <tr *ngFor="let user of results.users">
            <td>
              <span [class.inactive]="user.is_active === false">{{
                user.provider_name
              }}</span>
            </td>
            <td>
              <a
                class="full-row-link"
                [routerLink]="['/users', user.user_id]"
                >{{ user.email }}</a
              >
            </td>
            <td>{{ user.is_active ? 'Yes' : 'No' }}</td>
            <td *ngIf="user.last_sign_in_at; else never">
              {{ user.last_sign_in_at | date : 'long' : 'UTC' }}
            </td>
            <ng-template #never>
              <td>Never</td>
            </ng-template>
            <td>{{ user.provider_gateway_identifier }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ng-template #loading>
      <div class="loading">Loading...</div>
    </ng-template>
  `,
  styles: [
    `
      small {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        margin-bottom: 16px;
        color: var(--text-primary);
        border-radius: 4px;
        padding: 1px 4px;
      }

      span[class^='material'] {
        width: 16px;
        height: 16px;
        font-size: 16px;
      }

      .loading {
        background: var(--grey-010);
        height: calc(100% - 300px);
        display: grid;
        place-items: center;
        border-radius: 8px;
      }

      span.inactive {
        color: var(--text-secondary);
        font-style: italic;
      }

      .clickable-rows tr {
        position: relative;
      }

      .full-row-link::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        pointer-events: auto;
        content: '';
        background-color: rgba(0, 0, 0, 0);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginsComponent {
  loggedUsers$: Observable<UserLogins> = this.bhsdService.getUserLogins();
  // Sort by the provider name //  NX CACHE CLEAR COMMENT
  sortedLoggedUsers$ = this.loggedUsers$.pipe(
    map((results) => ({
      ...results,
      users: results.users.sort((a, b) =>
        a.provider_name.localeCompare(b.provider_name)
      ),
    }))
  );

  constructor(private bhsdService: BHSDService) {}
}
