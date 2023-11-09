import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BHSDService } from '@dbh/bhsd/data-access';
import { Observable, map } from 'rxjs';
import { ProvidersLog } from '@dbh/providers/data-access';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dbh-provider-logins',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ul class="breadcrumbs">
      <li>
        <a routerLink="/executive-dashboards" routerLinkActive="active">
          Executive Dashboard
        </a>
      </li>
      <li>Provider Logins</li>
    </ul>

    <h1>Provider Logins</h1>

    <small class="nonvisiblechange">
      <span class="material-symbols-outlined"> info </span>
      All times are displayed in UTC
    </small>

    <table *ngIf="sortedProviders$ | async as results; else loading">
      <thead>
        <th>Provider Name</th>
        <th>Last Activity</th>
        <th>Provider Gateway Identifier</th>
        <th>Email</th>
      </thead>
      <tbody>
        <tr *ngFor="let user of results.users">
          <td>{{ user.provider_name }}</td>
          <td *ngIf="user.last_sign_in_at; else never">
            {{ user.last_sign_in_at | date : 'long' : 'UTC' }}
          </td>
          <ng-template #never>
            <td>Never</td>
          </ng-template>
          <td>{{ user.provider_gateway_identifier }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderLoginsComponent {
  providers$: Observable<ProvidersLog> = this.bhsdService.getProviderLogins();
  // Sort by the provider name
  sortedProviders$ = this.providers$.pipe(
    map((results) => ({
      ...results,
      users: results.users.sort((a, b) =>
        a.provider_name.localeCompare(b.provider_name)
      ),
    }))
  );

  constructor(private bhsdService: BHSDService) {}
}
