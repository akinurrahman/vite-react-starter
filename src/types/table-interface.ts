export type FieldType = 'input' | 'select' | 'date' | 'checkbox' | 'number' | 'textarea';

export interface BaseColumnMeta {
  editable?: boolean;
  fieldType: FieldType;
}

export interface SelectColumnMeta extends BaseColumnMeta {
  fieldType: 'select';
  options: { label: string; value: string }[];
}

export interface NumberColumnMeta extends BaseColumnMeta {
  fieldType: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface DateColumnMeta extends BaseColumnMeta {
  fieldType: 'date';
  format?: string;
}

export interface TextareaColumnMeta extends BaseColumnMeta {
  fieldType: 'textarea';
  rows?: number;
}

export interface InputColumnMeta extends BaseColumnMeta {
  fieldType: 'input';
  placeholder?: string;
}

export interface CheckboxColumnMeta extends BaseColumnMeta {
  fieldType: 'checkbox';
}

export type CustomColumnMeta =
  | SelectColumnMeta
  | NumberColumnMeta
  | DateColumnMeta
  | TextareaColumnMeta
  | InputColumnMeta
  | CheckboxColumnMeta;
