import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, UrlTree } from '@angular/router';
import { filter, map, shareReplay, switchMap } from 'rxjs';
import { ClaimsService } from '@dbh/claims/data-access';

@Component({
  selector: 'clients-demographics-detail',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.scss'],
})
export class DemographicsComponent {
  clientId = this.router.parseUrl(this.router.url).root.children['primary']
    .segments[1].path;

  client$ = this.claimsService.getClient(this.clientId ?? 'fake-value');

  constructor(
    private activatedRoute: ActivatedRoute,
    private claimsService: ClaimsService,
    private router: Router
  ) {}
}
