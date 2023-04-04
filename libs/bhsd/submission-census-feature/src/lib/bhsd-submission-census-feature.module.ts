import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BhsdUiModule } from '@dbh/bhsd/ui';

import { SubmissionCensusComponent } from './submission-census/submission-census.component';

@NgModule({
  declarations: [SubmissionCensusComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SubmissionCensusComponent,
      },
    ]),
    BhsdUiModule,
  ],
})
export class BhsdSubmissionCensusFeatureModule {}
