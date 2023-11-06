import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dbh-provider-logins',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Provider Recent Logins</h1>
    <p>Page is under construction. Please check back later!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderLoginsComponent {}
