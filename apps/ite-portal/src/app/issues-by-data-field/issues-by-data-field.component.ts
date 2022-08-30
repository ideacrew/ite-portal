import { Component, Input } from '@angular/core';
import { ExtractRecordValidationV2 } from '@dbh/provider-extract/data-access';

@Component({
  selector: 'dbh-issues-by-data-field',
  templateUrl: './issues-by-data-field.component.html',
  styleUrls: ['./issues-by-data-field.component.scss'],
})
export class IssuesByDataFieldComponent {
  @Input() records!: ExtractRecordValidationV2[];
}
