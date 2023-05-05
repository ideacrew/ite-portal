import { Component, OnInit } from '@angular/core';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  //token: TokenObject = this.authService.decodedToken;

  isProvider = true;
  isDBHUser = true;

  applicationName = 'ITE Portal';

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (message: EventMessage) =>
            message.eventType === EventType.LOGIN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });
  }
}
