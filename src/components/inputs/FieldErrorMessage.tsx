import type {
  FormErrorMessageProps,
  FormHelperTextProps,
} from "@chakra-ui/react";
import { FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import type { FieldError } from "react-hook-form";

interface Props {
  helperText?: string;
  helperTextProps?: FormHelperTextProps;
  error?: FieldError;
  errorMessageProps?: FormErrorMessageProps;
}

const FieldErrorMessage = ({
  error,
  errorMessageProps,
  helperText,
  helperTextProps,
}: Props) => {
  if (error) {
    return (
      <FormErrorMessage {...errorMessageProps}>
        {error.message}
      </FormErrorMessage>
    );
  }
  if (helperText) {
    return <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>;
  }
  return null;
};

export default FieldErrorMessage;
