import { Component, Input } from '@angular/core';
import {
  ExtractRecordField,
  ValidationCategory,
} from '@dbh/provider-extract/data-access';

export interface CategoryWithCount {
  category: ValidationCategory;
  count: number;
}

@Component({
  selector: 'dbh-data-field-error-row',
  templateUrl: './data-field-error-row.component.html',
  styleUrls: ['./data-field-error-row.component.scss'],
})
export class DataFieldErrorRowComponent {
  @Input() dataField!: ExtractRecordField | string;
  @Input() countOfRecordsWithIssue!: number;
  @Input() categoriesWithError!: CategoryWithCount[];
}
