import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LogInComponent } from './log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [LogInComponent, UserProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [LogInComponent, UserProfileComponent],
})
export class AuthModule {}
