import { Component, Input } from '@angular/core';
import {
  ExtractRecordValidation,
  ValidationStatus,
} from '@dbh/provider-extract/data-access';

@Component({
  selector: 'dbh-record-count',
  templateUrl: './record-count.component.html',
  styleUrls: ['./record-count.component.scss'],
})
export class RecordCountComponent {
  @Input() records!: ExtractRecordValidation[];

  @Input() status!: ValidationStatus;
}
