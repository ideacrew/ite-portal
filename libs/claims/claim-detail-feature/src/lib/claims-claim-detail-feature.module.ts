import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClaimDetailComponent } from './claim-detail/claim-detail.component';

@NgModule({
  declarations: [ClaimDetailComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ClaimDetailComponent },
    ]),
  ],
})
export class ClaimsClaimDetailFeatureModule {}
