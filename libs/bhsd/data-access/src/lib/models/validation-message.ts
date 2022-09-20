import { ValidationCategory } from './validation-category';

export interface ValidationMessage {
  text: string;
  category: ValidationCategory | null;
}
