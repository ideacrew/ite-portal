import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, shareReplay, switchMap } from 'rxjs';
import { ClaimsService } from '@dbh/claims/data-access';

@Component({
  selector: 'clients-client-detail',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  client$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.claimsService.getClient(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  constructor(
    private route: ActivatedRoute,
    private claimsService: ClaimsService
  ) {}
}
