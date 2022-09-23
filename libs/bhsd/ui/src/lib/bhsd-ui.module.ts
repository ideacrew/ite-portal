import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FileInformationComponent } from './file-information/file-information.component';
import { ValidationBreakdownComponent } from './validation-breakdown/validation-breakdown.component';
import { RecordCountPipe } from './record-count.pipe';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordSortPipe } from './record-sort.pipe';
import { IssuesByDataFieldComponent } from './issues-by-data-field/issues-by-data-field.component';
import { DataFieldErrorRowComponent } from './data-field-error-row/data-field-error-row.component';
import { ErrorGroupComponent } from './error-group/error-group.component';
import { ValidDataComponent } from './valid-data/valid-data.component';
import { DataFieldChartComponent } from './data-field-chart/data-field-chart.component';
import { GetRecordIdentifierPipe } from './get-record-identifier.pipe';
import { SubmissionStatusChartComponent } from './submission-status-chart/submission-status-chart.component';

@NgModule({
  declarations: [
    FileInformationComponent,
    ValidationBreakdownComponent,
    RecordCountPipe,
    RecordListComponent,
    RecordSortPipe,
    IssuesByDataFieldComponent,
    DataFieldErrorRowComponent,
    ErrorGroupComponent,
    ValidDataComponent,
    DataFieldChartComponent,
    GetRecordIdentifierPipe,
    SubmissionStatusChartComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    FileInformationComponent,
    ValidationBreakdownComponent,
    RecordCountPipe,
    RecordListComponent,
    RecordSortPipe,
    IssuesByDataFieldComponent,
    DataFieldErrorRowComponent,
    ErrorGroupComponent,
    ValidDataComponent,
    DataFieldChartComponent,
    GetRecordIdentifierPipe,
    SubmissionStatusChartComponent,
  ],
})
export class BhsdUiModule {}
