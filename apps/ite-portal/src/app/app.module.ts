import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { RouterModule } from '@angular/router';
import { SubmitExtractComponent } from './submit-extract/submit-extract.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { ConfigService } from './config.service';

function initializeApp(config: ConfigService): Promise<unknown> {
  return new Promise((resolve) => {
    const [urlEnvironment] = window.location.host.split('.');
    console.log({ urlEnv: urlEnvironment });

    if (urlEnvironment.includes('markgoho')) {
      console.log('Codespaces environment');
    }

    if (urlEnvironment.includes('staging')) {
      console.log('Staging environment');
      config.baseApiUrl = `https://ite-api.herokuapp-staging.com`;
      config.environment = 'uat';
    }

    // Do some asynchronous stuff
    // eslint-disable-next-line unicorn/no-null
    resolve(null);
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
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      multi: true,
      deps: [ConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
