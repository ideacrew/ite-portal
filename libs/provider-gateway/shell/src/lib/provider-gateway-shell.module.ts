import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  AuthModule,
  ResetPasswordComponent,
  UserProfileComponent,
} from '@dbh/auth';
import { ProviderGuard } from '@dbh/providers/util';

import { ProviderGatewayShellComponent } from './provider-gateway-shell/provider-gateway-shell.component';

@NgModule({
  declarations: [ProviderGatewayShellComponent],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProviderGatewayShellComponent,
        children: [
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
