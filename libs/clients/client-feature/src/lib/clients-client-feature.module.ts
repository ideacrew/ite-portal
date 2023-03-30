import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientComponent } from './client/client.component';

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ClientComponent },
    ]),
  ],
})
export class ClientsClientComponentFeatureModule {}
