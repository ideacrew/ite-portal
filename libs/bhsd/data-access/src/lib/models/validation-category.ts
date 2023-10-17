export const validationCategory = [
  'Data Inconsistency',
  'Invalid Field',
  'Invalid Field Length',
  'Invalid Value',
  'Missing Value',
  'Potential Error',
  'Wrong Format',
] as const;

export type ValidationCategory = (typeof validationCategory)[number] | null;
