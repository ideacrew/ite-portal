import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BhsdUiModule } from '@dbh/bhsd/ui';

import { CompanionGuidePageComponent } from './companion-guide-page/companion-guide-page.component';

@NgModule({
  declarations: [CompanionGuidePageComponent],
  imports: [
    CommonModule,
    BhsdUiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CompanionGuidePageComponent },
    ]),
  ],
})
export class BhsdCompanionGuidePageFeatureModule {}
