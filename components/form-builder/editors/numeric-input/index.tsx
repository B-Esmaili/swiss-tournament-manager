import { forwardRef, KeyboardEvent } from "react";
import { Controller } from "react-hook-form";
import { NumericInputProps } from "./types";
import { TextInput as GrommetTextInput } from "grommet";
import { FormField } from "components/form-builder/types";
import WidthEditorWrap from "../shared/editor-wrap";
import useTranslation from "next-translate/useTranslation";

const NumericInput = forwardRef<HTMLInputElement, FormField<NumericInputProps>>(
  (props, ref) => {
    let vrules = props.validationRules || {};
    const { t: T } = useTranslation("form");

    let {
      name,
      label,
      defaultValue: initialValue,
      min,
      max,
      required,
      methods,
    } = props;

    let control = methods?.control;

    if (required) {
      vrules.required = {
        value: required,
        message: T("required-msg", { name : label }),
      };
    }

    if (min) {
      vrules.min = {
        value: min,
        message: T("numeric-input-min-msg", { name: label, value: min }),
      };
    }

    if (max) {
      vrules.max = {
        value: max,
        message: T("numeric-input-max-msg", { name: label, value: max }),
      };
    }

    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
      const numericRegex = /^[0-9.\/]*$/;
      if (e.key.length === 1 && !numericRegex.test(e.key)) {
        return e.preventDefault();
      }
    };

    return (
      <WidthEditorWrap {...props}>
        <Controller
          name={name}
          defaultValue={initialValue}
          rules={vrules}
          control={control}
          render={({ field }) => (
            <GrommetTextInput
              ref={ref}
              onKeyDown={handleKeydown}
              onChange={(e) => field.onChange(e.currentTarget.value)}
              defaultValue={field.value}
            />
          )}
        ></Controller>
      </WidthEditorWrap>
    );
  }
);

export default NumericInput;
