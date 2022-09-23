import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BhsdUiModule } from '@dbh/bhsd/ui';

import { RecordDetailComponent } from './record-detail/record-detail.component';

@NgModule({
  declarations: [RecordDetailComponent],
  imports: [
    CommonModule,
    BhsdUiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: RecordDetailComponent },
    ]),
  ],
})
export class BhsdRecordDetailFeatureModule {}
