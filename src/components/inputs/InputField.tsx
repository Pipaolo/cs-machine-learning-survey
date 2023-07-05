import type { InputProps } from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";
import { FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import FieldLabel from "./FieldLabel";
import FieldErrorMessage from "./FieldErrorMessage";
import type { BaseInputProps } from "../types/inputs";
import { cn } from "~/utils/styles";

export interface TextFieldProps extends BaseInputProps {
  register: UseFormRegisterReturn;
}

export const InputField = forwardRef<InputProps & TextFieldProps, "input">(
  (props, ref) => {
    const {
      register,
      formControlProps,
      label,
      labelProps,
      error,
      errorMessageProps,
      helperTextProps,
      helperText,
      isRequired = false,
      className,
      ...restProps
    } = props;

    return (
      <FormControl {...formControlProps} ref={ref} isInvalid={!!error}>
        <FieldLabel
          label={label}
          isRequired={isRequired}
          labelProps={labelProps}
        />
        <InputGroup>
          <Input
            className={cn([
              "bg-white text-gray-800 shadow-none shadow-mongoose outline-1 outline-offset-0 focus:border-mongoose focus:shadow-md focus:outline-mongoose",
              className,
            ])}
            {...register}
            {...restProps}
          />
        </InputGroup>
        <FieldErrorMessage
          error={error}
          errorMessageProps={errorMessageProps}
          helperText={helperText}
          helperTextProps={helperTextProps}
        />
      </FormControl>
    );
  }
);
