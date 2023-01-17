import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableauModule } from 'ngx-tableau';

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
import { SharedUiModule } from '@dbh/shared/ui';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { PortalDashboardComponent } from './portal-dashboard/portal-dashboard.component';
import { FakePageComponent } from './fake-page/fake-page.component';
import { AdjudicatedClaimsComponent } from './adjudicated-claims/adjudicated-claims.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    PortalDashboardComponent,
    FakePageComponent,
    AdjudicatedClaimsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataAccessModule,
    AuthModule,
    BhsdUiModule,
    SharedUiModule,
    TableauModule,
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
            path: 'home',
            component: PortalDashboardComponent,
          },

          {
            path: 'search-and-query',
            component: FakePageComponent,
          },
          {
            path: 'search-and-query/client-search',
            component: FakePageComponent,
          },

          {
            path: 'executive-dashboards',
            component: FakePageComponent,
          },
          {
            path: 'executive-dashboards/population-served',
            component: FakePageComponent,
          },

          {
            path: 'claims',
            component: FakePageComponent,
          },
          {
            path: 'claims/adjudicated-claims',
            component: AdjudicatedClaimsComponent,
          },

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
            loadChildren: () =>
              import('@dbh/bhsd/landing-page-feature').then(
                (m) => m.BhsdLandingPageFeatureModule
              ),
          },
          {
            path: 'reset-password',
            component: ResetPasswordComponent,
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: 'home',
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
