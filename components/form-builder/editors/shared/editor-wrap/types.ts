import React from "react";
import { DeepMap, FieldError, FieldValues } from "react-hook-form";

export interface EditorWrapProps {
  children: React.ReactChild;
  errors?: DeepMap<FieldValues, FieldError>;
  name: string;
  label: string;
  tip?: React.ReactNode,
  labelPosition?: "top" | "side";
}
