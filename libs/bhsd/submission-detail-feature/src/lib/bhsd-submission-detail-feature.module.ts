import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { BhsdUiModule } from '@dbh/bhsd/ui';

@NgModule({
  declarations: [SubmissionDetailComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SubmissionDetailComponent },
    ]),
    BhsdUiModule,
  ],
})
export class BhsdSubmissionDetailFeatureModule {}
