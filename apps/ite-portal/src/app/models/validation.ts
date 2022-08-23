import { RecordKeys } from './extract-record-data';
import { ValidationMessage } from './validation-message';

export type Validation = Partial<Record<RecordKeys, ValidationMessage>>;
