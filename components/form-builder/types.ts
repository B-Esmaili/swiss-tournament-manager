import { FileInputProps } from './editors/file-input/types';
import { BoolInputProps } from "./editors/bool-input/types";
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { DateInputProps } from "./editors/date-input/types";
import { NumericInputProps } from "./editors/numeric-input/types";
import { TextInputProps } from "./editors/text-input/types";
import { DropDownProps } from "./editors/drop-down/types";
import { PasswordInputProps } from "./editors/password-input/types";

export enum FormFieldType {
  Text = 1,
  Number = 2,
  Boolean = 3,
  Date = 4,
  DateRange = 5,
  DropDown = 6,
  List = 7,
  Password = 8,
  File = 9
}

export type FormFieldOptions =
  | {
      type: FormFieldType.Text;
    } & TextInputProps
  | {
      type: FormFieldType.Number;
    } & NumericInputProps
  | {
      type: FormFieldType.Date;
    } & DateInputProps
  | {
      type: FormFieldType.Boolean;
    } & BoolInputProps
  | {
      type: FormFieldType.DropDown;
    } & DropDownProps
  | {
    type: FormFieldType.Password;
  } & PasswordInputProps 
  | {
    type: FormFieldType.File;
  } & FileInputProps ;

export interface FormFieldBase {
  name: string;
  tip?: React.ReactNode;
  defaultValue?: any;
  label: string;
  labelPosition?: "top" | "side";
  validationRules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  submitTrigger?: boolean;
  onChange? : (value : any)=>void
}

export type FormField<TProps extends {} = {}> = FormFieldBase &
  FormFieldOptions &
  TProps & {
    methods?: UseFormReturn;
  };

export interface FormBuilderProps extends Partial<Omit<HTMLDivElement,"children">> {
  fields: FormField[];
  children: React.ReactNode;  
  onSubmit?: (values: any) => void;
}

export type FormEditorPropsBase = Pick<FormFieldBase, "validationRules"> & {};
