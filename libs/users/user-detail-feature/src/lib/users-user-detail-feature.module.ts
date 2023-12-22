import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UserDetailComponent },
    ]),
  ],
})
export class UsersUserDetailFeatureModule {}
