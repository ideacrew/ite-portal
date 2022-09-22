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

import { AppComponent } from './app.component';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { SubmitExtractComponent } from './submit-extract/submit-extract.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { RecordCountPipe } from './record-count.pipe';
import { RecordCountComponent } from './record-count/record-count.component';
import { ErrorCountPipe } from './error-count.pipe';
import { ErrorsByCategoryComponent } from './errors-by-category/errors-by-category.component';
import { IssuesByDataFieldComponent } from './issues-by-data-field/issues-by-data-field.component';
import { RecordsWithErrorTypePipe } from './records-with-error-type.pipe';
import { GroupByDataFieldPipe } from './group-by-data-field.pipe';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { ErrorGroupComponent } from './error-group/error-group.component';
import { RecordSortPipe } from './record-sort.pipe';
import { DataFieldErrorRowComponent } from './data-field-error-row/data-field-error-row.component';
import { FileInformationComponent } from './file-information/file-information.component';
import { DataFieldChartComponent } from './data-field-chart/data-field-chart.component';
import { PortalComponent } from './portal/portal.component';
import { ProviderGuard } from './provider.guard';
import { ProvidersSubmissionStatusComponent } from './providers-submission-status/providers-submission-status.component';
import { ValidDataComponent } from './valid-data/valid-data.component';
import { ProviderGatewayComponent } from './provider-gateway/provider-gateway.component';
import { ValidationBreakdownComponent } from './validation-breakdown/validation-breakdown.component';
import { SubmissionStatusChartComponent } from './submission-status-chart/submission-status-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmissionsListComponent,
    SubmitExtractComponent,
    SubmissionDetailComponent,
    RecordCountPipe,
    ErrorCountPipe,
    RecordCountComponent,
    ErrorsByCategoryComponent,
    IssuesByDataFieldComponent,
    RecordsWithErrorTypePipe,
    GroupByDataFieldPipe,
    RecordListComponent,
    RecordDetailComponent,
    ErrorGroupComponent,
    RecordSortPipe,
    DataFieldErrorRowComponent,
    FileInformationComponent,
    DataFieldChartComponent,
    PortalComponent,
    ProvidersSubmissionStatusComponent,
    ValidDataComponent,
    ProviderGatewayComponent,
    ValidationBreakdownComponent,
    SubmissionStatusChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataAccessModule,
    AuthModule,
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
            component: SubmissionsListComponent,
          },
          {
            path: 'provider-gateway/submissions/:id/records/:recordId',
            component: RecordDetailComponent,
          },
          {
            path: 'provider-gateway/submissions/:id',
            component: SubmissionDetailComponent,
          },
          {
            path: 'provider-gateway/submit-extract',
            component: SubmitExtractComponent,
            canActivate: [ProviderGuard],
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
            component: ProvidersSubmissionStatusComponent,
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
