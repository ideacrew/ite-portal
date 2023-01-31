import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BhsdUiModule } from '@dbh/bhsd/ui';
import { BhsdStoreModule } from '@dbh/bhsd/store';

import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';

@NgModule({
  declarations: [SubmissionDetailComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SubmissionDetailComponent },
    ]),
    BhsdUiModule,
    BhsdStoreModule,
  ],
})
export class BhsdSubmissionDetailFeatureModule {}
