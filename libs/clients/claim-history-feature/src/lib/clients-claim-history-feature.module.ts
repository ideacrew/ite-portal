import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClaimHistoryComponent } from './claim-history/claim-history.component';

@NgModule({
  declarations: [ClaimHistoryComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ClaimHistoryComponent },
    ]),
  ],
})
export class ClientsClaimHistoryComponentFeatureModule {}
