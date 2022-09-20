import { Component, Input } from '@angular/core';

import {
  ValidationCategory,
  validationCategory,
  ExtractRecordValidation,
} from '@dbh/bhsd/data-access';

@Component({
  selector: 'dbh-errors-by-category',
  templateUrl: './errors-by-category.component.html',
  styleUrls: ['./errors-by-category.component.scss'],
})
export class ErrorsByCategoryComponent {
  readonly categories: readonly ValidationCategory[] = validationCategory;
  @Input() records!: ExtractRecordValidation[];
}
