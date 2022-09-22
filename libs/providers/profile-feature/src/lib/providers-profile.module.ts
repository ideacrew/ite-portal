import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';

@NgModule({
  declarations: [ProviderProfileComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: ':providerId',
        pathMatch: 'full',
        component: ProviderProfileComponent,
      },
    ]),
  ],
})
export class ProvidersProfileModule {}
