import { Component, Input } from '@angular/core';
import { ExtractRecordField } from '@dbh/bhsd/data-access';

import { CategoryWithCount } from '../interfaces';

@Component({
  selector: 'dbh-data-field-error-row',
  templateUrl: './data-field-error-row.component.html',
  styleUrls: ['./data-field-error-row.component.scss'],
})
export class DataFieldErrorRowComponent {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  @Input() dataField!: ExtractRecordField | string;
  @Input() countOfRecordsWithIssue!: number;
  @Input() categoriesWithError!: CategoryWithCount[];
}
