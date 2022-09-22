import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProviderGatewayShellComponent } from './provider-gateway-shell/provider-gateway-shell.component';

@NgModule({
  declarations: [ProviderGatewayShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProviderGatewayShellComponent },
    ]),
  ],
})
export class ProviderGatewayShellModule {}
