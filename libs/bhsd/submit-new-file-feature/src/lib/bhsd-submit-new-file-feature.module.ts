import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SubmitExtractComponent } from './submit-extract/submit-extract.component';

@NgModule({
  declarations: [SubmitExtractComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SubmitExtractComponent },
    ]),
  ],
})
export class BhsdSubmitNewFileFeatureModule {}
