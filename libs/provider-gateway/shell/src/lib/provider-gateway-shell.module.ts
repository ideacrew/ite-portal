import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthModule, UserProfileComponent } from '@dbh/auth';

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
        ],
      },
    ]),
  ],
})
export class ProviderGatewayShellModule {}
