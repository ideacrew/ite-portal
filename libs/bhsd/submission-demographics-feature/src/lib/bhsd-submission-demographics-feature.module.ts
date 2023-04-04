import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BhsdUiModule } from '@dbh/bhsd/ui';

import { SubmissionDemographicsComponent } from './submission-demographics/submission-demographics.component';

@NgModule({
  declarations: [SubmissionDemographicsComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SubmissionDemographicsComponent,
      },
    ]),
    BhsdUiModule,
  ],
})
export class BhsdSubmissionDemographicsFeatureModule {}
