import { ValidationCategory } from '@dbh/bhsd/data-access';

export type CategoryWithCount = {
  category: ValidationCategory;
  count: number;
};
