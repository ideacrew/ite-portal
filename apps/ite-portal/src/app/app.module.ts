import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DataAccessModule } from '@dbh/provider-extract/data-access';

import { AppComponent } from './app.component';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';
import { SubmitExtractComponent } from './submit-extract/submit-extract.component';
import { SubmissionDetailComponent } from './submission-detail/submission-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
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
import { LogInComponent } from './log-in/log-in.component';
import { AuthInterceptor } from './auth-interceptor.service';
import { PortalComponent } from './portal/portal.component';
import { AuthGuard } from './auth.guard';

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
    LogInComponent,
    PortalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataAccessModule,
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
            path: 'submissions',
            component: SubmissionsListComponent,
          },
          {
            path: 'submissions/:id/records/:recordId',
            component: RecordDetailComponent,
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
            path: '',
            redirectTo: 'submit-extract',
            pathMatch: 'full',
          },
        ],
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
