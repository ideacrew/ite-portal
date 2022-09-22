import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';

@NgModule({
  declarations: [SubmissionsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SubmissionsListComponent },
    ]),
  ],
})
export class BhsdSubmissionHistoryFeatureModule {}
