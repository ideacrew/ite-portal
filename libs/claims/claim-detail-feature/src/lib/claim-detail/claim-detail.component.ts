import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, shareReplay, switchMap } from 'rxjs';
import { ClaimsService } from '@dbh/claims/data-access';

@Component({
  selector: 'claims-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss'],
})
export class ClaimDetailComponent {
  claim$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.claimsService.getClaim(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  constructor(
    private route: ActivatedRoute,
    private claimsService: ClaimsService
  ) {}

  serviceLength({
    billingDate,
    lastServiceDate,
  }: {
    billingDate: Date;
    lastServiceDate?: Date;
  }): string {
    if (lastServiceDate) {
      const diff = Math.abs(
        new Date(billingDate).getTime() - new Date(lastServiceDate).getTime()
      );
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return `${diffDays} days`;
    }
    return '';
  }
}
