import type {
  FormControlProps,
  FormErrorMessageProps,
  FormLabelProps,
  FormHelperTextProps,
} from "@chakra-ui/react";
import type { FieldError } from "react-hook-form";

export interface BaseInputProps {
  isRequired?: boolean;
  formControlProps?: FormControlProps;
  label?: string;
  labelProps?: FormLabelProps;
  helperText?: string;
  helperTextProps?: FormHelperTextProps;
  error?: FieldError;
  errorMessageProps?: FormErrorMessageProps;
}

export interface SelectOption<T> {
  label: string;
  value: T;
}
