import {
  Button,
  Checkbox,
  Heading,
  Text,
  type UseStepsReturn,
  useToast,
} from "@chakra-ui/react";
import {
  useForm,
  type FieldErrors,
  Controller,
  type UseFormReturn,
} from "react-hook-form";
import { type SurveyFormPart3Schema } from "../types";
import { SurveyFormGenreSelectInput } from "./SurveyFormGenreSelectInput";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  stepper: UseStepsReturn;
  form: UseFormReturn<SurveyFormPart3Schema>;
  isLoading: boolean;
  onSubmit: (data: SurveyFormPart3Schema) => void;
}

export const SurveyFormPart3 = ({ form, ...props }: Props) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <Heading size={"md"}>Favorite Spotify Music Genre Top 5</Heading>
      <SurveyFormGenreSelectInput
        isRequired
        error={errors["Music_Genres_1"]}
        label="Genre 1"
        name="Music_Genres_1"
        control={control}
      />
      <SurveyFormGenreSelectInput
        isRequired
        error={errors["Music_Genres_2"]}
        label="Genre 2"
        name="Music_Genres_2"
        control={control}
      />
      <SurveyFormGenreSelectInput
        isRequired
        error={errors["Music_Genres_3"]}
        label="Genre 3"
        name="Music_Genres_3"
        control={control}
      />
      <SurveyFormGenreSelectInput
        isRequired
        error={errors["Music_Genres_4"]}
        label="Genre 4"
        name="Music_Genres_4"
        control={control}
      />
      <SurveyFormGenreSelectInput
        isRequired
        error={errors["Music_Genres_5"]}
        label="Genre 5"
        name="Music_Genres_5"
        control={control}
      />

      <Controller
        name="Permission"
        control={control}
        render={({ field }) => (
          <Checkbox
            colorScheme="green"
            isChecked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            By checking this box, you agree to have your input be used in our
            study regarding preferences over video streaming platforms
          </Checkbox>
        )}
      />
      <div className="flex w-full justify-between">
        <Button
          className="rounded-full bg-sulu hover:bg-opacity-50"
          isDisabled={props.stepper.activeStep === 0 || props.isLoading}
          onClick={() => props.stepper.goToPrevious()}
        >
          Go Back
        </Button>
        <Button
          className="rounded-full bg-sulu hover:bg-opacity-50"
          isDisabled={!form.formState.isValid || props.isLoading}
          isLoading={props.isLoading}
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
};
