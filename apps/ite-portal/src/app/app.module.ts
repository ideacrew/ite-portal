import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { RouterModule } from '@angular/router';
import { SubmitExtractComponent } from './submit-extract/submit-extract.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';

function initializeApp(): Promise<any> {
  return new Promise((resolve, reject) => {
    const [urlEnv] = window.location.host.split('.');
    console.log({ urlEnv });
    // Do some asynchronous stuff
    resolve();
  });
}

@NgModule({
  declarations: [
    AppComponent,
    SubmissionsListComponent,
    SubmitExtractComponent,
    SubmissionDetailComponent,
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
        path: '**',
        component: SubmitExtractComponent,
      },
    ]),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => initializeApp,
    multi: true,
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}
