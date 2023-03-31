import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DemographicsComponent } from './demographics/demographics.component';

@NgModule({
  declarations: [DemographicsComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DemographicsComponent },
    ]),
  ],
})
export class ClientsDemographicsComponentFeatureModule {}
