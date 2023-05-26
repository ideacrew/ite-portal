import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetForgottenPasswordComponent } from './reset-forgotten-password/reset-forgotten-password.component';

@NgModule({
  declarations: [
    LogInComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ResetForgottenPasswordComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    LogInComponent,
    UserProfileComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ResetForgottenPasswordComponent,
  ],
})
export class AuthModule {}
