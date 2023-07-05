import {
  Controller,
  type ControllerProps,
  type FieldName,
} from "react-hook-form";
import { type SurveyFormSchema } from "../types";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import Select from "react-select";
import { type BaseInputProps } from "~/components/types/inputs";
import FieldErrorMessage from "~/components/inputs/FieldErrorMessage";
import FieldLabel from "~/components/inputs/FieldLabel";

interface Props extends BaseInputProps {
  name: FieldName<SurveyFormSchema>;

  /// The `control` prop from `useForm` only get the genres as a string, so we
  /// need to use the `Controller` component from `react-hook-form` to get the
  /// genres as an object.

  control: ControllerProps<SurveyFormSchema>["control"];
}

const musicGenres = [
  "Pop",
  "Rock",
  "Country",
  "Jazz",
  "Blues",
  "Electronic/Dance",
  "Hip-Hop/Rap",
  "R&B/Soul",
  "Classical",
  "Metal",
  "Punk",
];

export const SurveyFormGenreSelectInput = (props: Props) => {
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
          const value = (field.value as string) ?? "";
          return (
            <Select<{ label: string; value: string }>
              value={{
                label: value,
                value: value,
              }}
              name={restProps.name}
              onChange={(newValue) => {
                field.onChange(newValue?.value ?? "");
              }}
              options={musicGenres.map((genre) => ({
                label: genre,
                value: genre,
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
