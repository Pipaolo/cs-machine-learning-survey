import type { SelectProps } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";
import { FormControl, Select } from "@chakra-ui/react";
import type { BaseInputProps } from "../types/inputs";
import FieldErrorMessage from "./FieldErrorMessage";
import FieldLabel from "./FieldLabel";

export interface SelectFieldProps extends SelectProps, BaseInputProps {
  isLoading?: boolean;
  renderOptions?: () => React.ReactNode;
  renderInput?: (props: SelectProps) => JSX.Element;
}

const SelectField = forwardRef<SelectFieldProps, "select">((props, ref) => {
  const {
    renderInput,
    renderOptions,
    isLoading,
    isRequired,
    labelProps,
    label,
    helperText,
    helperTextProps,
    error,
    errorMessageProps,
    ...restProps
  } = props;

  return (
    <FormControl isDisabled={restProps.isDisabled} isInvalid={!!error}>
      <FieldLabel
        label={label}
        isRequired={isRequired}
        labelProps={labelProps}
      />
      {renderInput?.(restProps) ?? (
        <Select ref={ref} disabled={isLoading} {...restProps}>
          {renderOptions?.()}
        </Select>
      )}
      <FieldErrorMessage
        error={error}
        errorMessageProps={errorMessageProps}
        helperText={helperText}
        helperTextProps={helperTextProps}
      />
    </FormControl>
  );
});

export { SelectField };
