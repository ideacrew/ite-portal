import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DataAccessModule } from '@dbh/bhsd/data-access';
import {
  AuthGuard,
  AuthInterceptor,
  AuthModule,
  LogInComponent,
  UserProfileComponent,
  ResetPasswordComponent,
} from '@dbh/auth';
import { APP_TITLE } from '@dbh/theme';
import { BhsdUiModule } from '@dbh/bhsd/ui';
import { ProviderGuard } from '@dbh/providers/util';

import { AppComponent } from './app.component';
import { RecordCountComponent } from './record-count/record-count.component';
import { ErrorCountPipe } from './error-count.pipe';
import { RecordsWithErrorTypePipe } from './records-with-error-type.pipe';
import { GroupByDataFieldPipe } from './group-by-data-field.pipe';
import { PortalComponent } from './portal/portal.component';
import { ProviderGatewayComponent } from './provider-gateway/provider-gateway.component';
import { SubmissionStatusChartComponent } from './submission-status-chart/submission-status-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorCountPipe,
    RecordCountComponent,
    RecordsWithErrorTypePipe,
    GroupByDataFieldPipe,
    PortalComponent,
    ProviderGatewayComponent,
    SubmissionStatusChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataAccessModule,
    AuthModule,
    BhsdUiModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LogInComponent,
      },
      {
        path: '',
        component: PortalComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'provider-gateway/submissions',
            loadChildren: () =>
              import('@dbh/bhsd/submission-history-feature').then(
                (m) => m.BhsdSubmissionHistoryFeatureModule
              ),
          },
          {
            path: 'provider-gateway/submissions/:id/records/:recordId',
            loadChildren: () =>
              import('@dbh/bhsd/record-detail-feature').then(
                (m) => m.BhsdRecordDetailFeatureModule
              ),
          },
          {
            path: 'provider-gateway/submissions/:id',
            loadChildren: () =>
              import('@dbh/bhsd/submission-detail-feature').then(
                (m) => m.BhsdSubmissionDetailFeatureModule
              ),
          },
          {
            path: 'provider-gateway/submit-new-bhsd',
            loadChildren: () =>
              import('@dbh/bhsd/submit-new-file-feature').then(
                (m) => m.BhsdSubmitNewFileFeatureModule
              ),
            canLoad: [ProviderGuard],
          },
          {
            path: 'provider-gateway/provider-profile',
            loadChildren: () =>
              import('@dbh/providers/profile-feature').then(
                (m) => m.ProvidersProfileModule
              ),
          },
          {
            path: 'user-profile',
            component: UserProfileComponent,
          },
          {
            path: 'provider-gateway/submission-status',
            loadChildren: () =>
              import('@dbh/bhsd/submission-status-feature').then(
                (m) => m.BhsdSubmissionStatusFeatureModule
              ),
          },
          {
            path: 'provider-gateway',
            component: ProviderGatewayComponent,
          },
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
          },
          {
            path: '',
            redirectTo: 'provider-gateway',
            pathMatch: 'full',
          },
        ],
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_TITLE,
      useValue: 'ITE Portal',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
