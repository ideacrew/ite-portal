import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsService } from '@dbh/claims/data-access';

@Component({
  selector: 'clients-claim-history',
  templateUrl: './claim-history.component.html',
  styleUrls: ['./claim-history.component.scss'],
})
export class ClaimHistoryComponent {
  clientId = this.router.parseUrl(this.router.url).root.children['primary']
    .segments[1].path;

  client$ = this.claimsService.getClient(this.clientId ?? 'fake-value');
  claims$ = this.claimsService.getClientClaims(this.clientId ?? 'fake-value');

  constructor(
    private activatedRoute: ActivatedRoute,
    private claimsService: ClaimsService,
    private router: Router
  ) {}
}
