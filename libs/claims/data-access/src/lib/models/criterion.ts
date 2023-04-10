import { Observable } from 'rxjs';

export type Criterion = {
  selector?: string;
  valueType?: string;
  relative?: string;
  value?: string;
  options?: ValueOption[];
  asyncOptions?: Observable<ValueOption[]>;
};

export type ValueOption = {
  value: string;
  display: string;
};
