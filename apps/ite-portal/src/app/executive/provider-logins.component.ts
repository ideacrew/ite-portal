import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BHSDService } from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-provider-logins',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Provider Recent Logins</h1>

    <table>
      <thead>
        <th>
          <h2>Provider Name</h2>
        </th>
        <th>
          <h2>Last Login</h2>
        </th>
        <th>
          <h2>Provider Gateway Identifier</h2>
        </th>
        <th>
          <h2>Email</h2>
        </th>
      </thead>
      <tbody>
        <tr *ngFor="let user of mockData.users">
          <td>{{ user.providerName }}</td>
          <td>{{ user.lastSignInAt | date : 'medium' }}</td>
          <td>{{ user.providerGatewayIdentifier }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderLoginsComponent {
  mockData = {
    users: [
      {
        userId: 1,
        email: 'kristin.merbach@ideacrew.com',
        lastSignInAt: '2023-11-02T18:16:55.143Z',
        providerGatewayIdentifier: '518',
        providerName: 'KristinProvider',
      },
      {
        userId: 2,
        email: 'ian.alexander@ideacrew.com',
        lastSignInAt: null,
        providerGatewayIdentifier: '168',
        providerName: 'IanProvider',
      },
      {
        userId: 3,
        email: 'hari.yamjala@ideacrew.com',
        lastSignInAt: null,
        providerGatewayIdentifier: '233',
        providerName: 'HariProvider',
      },
    ],
  };

  constructor(private bhsdService: BHSDService) {}
}
