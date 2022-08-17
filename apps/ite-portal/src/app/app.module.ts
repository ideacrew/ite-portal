import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { RouterModule } from '@angular/router';
import { SubmitExtractComponent } from './submit-extract/submit-extract.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionsListComponent,
    SubmitExtractComponent,
    SubmissionDetailComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'submissions',
        component: SubmissionsListComponent,
      },
      {
        path: 'submissions/:id',
        component: SubmissionDetailComponent,
      },
      {
        path: 'submit-extract',
        component: SubmitExtractComponent,
      },
      {
        path: 'provider-profile',
        component: UserProfileComponent,
      },
      {
        path: '**',
        redirectTo: 'submit-extract',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
