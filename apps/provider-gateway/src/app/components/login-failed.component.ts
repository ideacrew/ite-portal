import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dbh-login-failed',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <p>login-failed works!</p>
    <button routerLink="/provider-gateway">Home</button>
  `,
  styles: [],
})
export class LoginFailedComponent {}
