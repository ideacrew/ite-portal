import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProvidersSubmissionStatusComponent } from './providers-submission-status/providers-submission-status.component';
import { PassRatePipe } from './pass-rate.pipe';

@NgModule({
  declarations: [ProvidersSubmissionStatusComponent, PassRatePipe],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ProvidersSubmissionStatusComponent,
      },
    ]),
  ],
})
export class BhsdSubmissionStatusFeatureModule {}
