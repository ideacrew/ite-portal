import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BhsdUiModule } from '@dbh/bhsd/ui';

import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    BhsdUiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LandingPageComponent },
    ]),
  ],
})
export class BhsdLandingPageFeatureModule {}
