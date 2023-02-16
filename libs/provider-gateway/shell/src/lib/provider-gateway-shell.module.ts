import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  AuthModule,
  ResetPasswordComponent,
  UserProfileComponent,
} from '@dbh/auth';
import { ProviderGuard } from '@dbh/providers/util';
import { SharedUiModule } from '@dbh/shared/ui';

import { ProviderGatewayShellComponent } from './provider-gateway-shell/provider-gateway-shell.component';

@NgModule({
  declarations: [ProviderGatewayShellComponent],
  imports: [
    CommonModule,
    AuthModule,
    SharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProviderGatewayShellComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@dbh/bhsd/landing-page-feature').then(
                (m) => m.BhsdLandingPageFeatureModule
              ),
          },
          {
            path: 'submission-history/:id/records/:recordId',
            loadChildren: () =>
              import('@dbh/bhsd/record-detail-feature').then(
                (m) => m.BhsdRecordDetailFeatureModule
              ),
          },
          {
            path: 'submission-history/:id',
            loadChildren: () =>
              import('@dbh/bhsd/submission-detail-feature').then(
                (m) => m.BhsdSubmissionDetailFeatureModule
              ),
          },
          {
            path: 'submission-history',
            loadChildren: () =>
              import('@dbh/bhsd/submission-history-feature').then(
                (m) => m.BhsdSubmissionHistoryFeatureModule
              ),
          },
          {
            path: 'submissions',
            loadChildren: () =>
              import('@dbh/bhsd/submission-history-feature').then(
                (m) => m.BhsdSubmissionHistoryFeatureModule
              ),
          },
          {
            path: 'submission-status',
            loadChildren: () =>
              import('@dbh/bhsd/submission-status-feature').then(
                (m) => m.BhsdSubmissionStatusFeatureModule
              ),
          },
          {
            path: 'provider-profile/:id',
            loadChildren: () =>
              import('@dbh/providers/profile-feature').then(
                (m) => m.ProvidersProfileModule
              ),
          },
          {
            path: 'user-profile',
            component: UserProfileComponent,
          },
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
          },
          {
            path: 'submit-new-bhsd',
            loadChildren: () =>
              import('@dbh/bhsd/submit-new-file-feature').then(
                (m) => m.BhsdSubmitNewFileFeatureModule
              ),
            canLoad: [ProviderGuard],
          },
        ],
      },
    ]),
  ],
})
export class ProviderGatewayShellModule {}
