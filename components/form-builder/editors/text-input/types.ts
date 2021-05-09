import { FormEditorPropsBase } from "components/form-builder/types";


export type TextInputProps = FormEditorPropsBase & {
    minLength?: number,
    maxLength?: number,
    name: string,
    defaultValue : string
}