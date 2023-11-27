import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card class="link-card">
      <mat-card-header>
        <mat-card-title>App Messages</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="messages-box" *ngIf="messageService.messages.length">
          <button
            mat-raised-button
            color="primary"
            (click)="messageService.clear()"
          >
            Clear messages
          </button>

          <ul role="list">
            <li *ngFor="let message of messageService.messages">
              {{ message }}
            </li>
          </ul>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card-header {
        padding-bottom: 16px;
      }
    `,
  ],
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
