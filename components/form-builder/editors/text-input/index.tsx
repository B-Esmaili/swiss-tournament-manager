import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { TextInputProps } from "./types";
import { TextInput as GrommetTextInput } from 'grommet';
import { FormField } from "components/form-builder/types";
import WithEditorWrap from "../shared/editor-wrap";
import useTranslation from 'next-translate/useTranslation';

const TextInput = forwardRef<HTMLInputElement, FormField<TextInputProps>>((props, ref) => {

    let vrules = props.validationRules || {};

    const {t : T} = useTranslation("form");

    let {
        name,
        label,
        defaultValue: initialValue,
        minLength,
        maxLength,
        required,
        methods
    } = props;

    let control = methods?.control;

    if (required) {
        vrules.required = {
            value: required,
            message: T("required-msg",{name: label})
        }
    };

    if (minLength) {
        vrules.minLength = {
            value: minLength,
            message: T("text-input-min-length-msg",{name: label,value : minLength})
        }
    };

    if (maxLength) {
        vrules.maxLength = {
            value: maxLength,
            message: T("text-input-max-length-msg",{name: label,maxLength})
        }
    };

    return <WithEditorWrap {...props}>
        <Controller
            name={name}
            defaultValue={initialValue}
            rules={vrules}
            control={control}
            render={({ field }) => (
                <GrommetTextInput ref={ref} onChange={(e) => field.onChange(e)} defaultValue={field.value} />
            )}/>
    </WithEditorWrap>
});


export default TextInput;