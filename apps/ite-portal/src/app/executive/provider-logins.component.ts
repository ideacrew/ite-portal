import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BHSDService } from '@dbh/bhsd/data-access';
import { Observable } from 'rxjs';
import { ProvidersLog } from '@dbh/providers/data-access';

@Component({
  selector: 'dbh-provider-logins',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Provider Recent Logins</h1>

    <table *ngIf="testing$ | async as results">
      <thead>
        <th>Provider Name</th>
        <th>Last Login</th>
        <th>Provider Gateway Identifier</th>
        <th>Email</th>
      </thead>
      <tbody>
        <tr *ngFor="let user of results.users">
          <td>{{ user.provider_name }}</td>
          <td *ngIf="user.last_sign_in_at; else never">
            {{ user.last_sign_in_at | date : 'medium' }}
          </td>
          <ng-template #never>
            <td>Never</td>
          </ng-template>
          <td>{{ user.provider_gateway_identifier }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderLoginsComponent {
  testing$: Observable<ProvidersLog> = this.bhsdService.getProviderLogins();

  constructor(private bhsdService: BHSDService) {}
}
