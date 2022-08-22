import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { SubmitExtractComponent } from './submit-extract/submit-extract.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RecordCountPipe } from './record-count.pipe';
import { RecordCountComponent } from './record-count/record-count.component';
import { ErrorCountPipe } from './error-count.pipe';
import { ErrorsByCategoryComponent } from './errors-by-category/errors-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionsListComponent,
    SubmitExtractComponent,
    SubmissionDetailComponent,
    UserProfileComponent,
    RecordCountPipe,
    ErrorCountPipe,
    RecordCountComponent,
    ErrorsByCategoryComponent,
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
