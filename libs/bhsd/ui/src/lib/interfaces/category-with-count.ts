import { ValidationCategory } from '@dbh/bhsd/data-access';

export interface CategoryWithCount {
  category: ValidationCategory;
  count: number;
}
