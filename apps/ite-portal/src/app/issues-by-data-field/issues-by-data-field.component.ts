import { Component, Input } from '@angular/core';
import { IssuesByDataField } from '../models/issues-by-data-field';

@Component({
  selector: 'dbh-issues-by-data-field',
  templateUrl: './issues-by-data-field.component.html',
  styleUrls: ['./issues-by-data-field.component.scss'],
})
export class IssuesByDataFieldComponent {
  @Input() issuesByDataField!: IssuesByDataField[];
}
