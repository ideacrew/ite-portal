export type Criterion = {
  selector?: string;
  valueType?: string;
  relative?: string;
  value?: string;
  options?: ValueOption[];
};

export type ValueOption = {
  value: string;
  display: string;
};
