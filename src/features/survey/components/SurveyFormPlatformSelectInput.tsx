import {
  Controller,
  type ControllerProps,
  type FieldName,
} from "react-hook-form";
import { type SurveyFormPart1Schema } from "../types";
import { FormControl } from "@chakra-ui/react";
import Select from "react-select/creatable";
import { type BaseInputProps } from "~/components/types/inputs";
import FieldErrorMessage from "~/components/inputs/FieldErrorMessage";
import FieldLabel from "~/components/inputs/FieldLabel";
import { cn } from "~/utils/styles";

interface Props extends BaseInputProps {
  name: FieldName<SurveyFormPart1Schema>;

  /// The `control` prop from `useForm` only get the genres as a string, so we
  /// need to use the `Controller` component from `react-hook-form` to get the
  /// genres as an object.

  control: ControllerProps<SurveyFormPart1Schema>["control"];
}

const musicPlatforms = ["Spotify", "Apple Music"];

export const SurveyFormPlatformSelectInput = (props: Props) => {
  const {
    formControlProps,
    label,
    labelProps,
    error,
    errorMessageProps,
    helperTextProps,
    helperText,
    isRequired = false,
    ...restProps
  } = props;

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      <FieldLabel
        label={label}
        isRequired={isRequired}
        labelProps={labelProps}
      />
      <Controller
        name={restProps.name}
        control={restProps.control}
        render={({ field }) => {
          const value = field.value ?? "";
          return (
            <Select<{ label: string; value: string }>
              value={{
                label: value,
                value: value,
              }}
              name={restProps.name}
              formatCreateLabel={(inputValue) => `Others: "${inputValue}"`}
              className=""
              classNames={{
                control: (props) =>
                  cn([
                    props.isFocused
                      ? "border-mongoose shadow shadow-mongoose"
                      : "border-gray-300",
                  ]),
                dropdownIndicator: (props) =>
                  cn([props.isFocused && "text-mongoose"]),
              }}
              onChange={(newValue) => {
                field.onChange(newValue?.value ?? "");
              }}
              options={musicPlatforms.map((platform) => ({
                label: platform,
                value: platform,
              }))}
            />
          );
        }}
      />
      <FieldErrorMessage
        error={error}
        errorMessageProps={errorMessageProps}
        helperText={helperText}
        helperTextProps={helperTextProps}
      />
    </FormControl>
  );
};
