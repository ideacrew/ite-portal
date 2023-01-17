import { ValidationCategory } from './validation-category';

export type ValidationMessage = {
  text: string;
  category: ValidationCategory | null;
};
