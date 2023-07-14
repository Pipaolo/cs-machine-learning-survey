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
import { type SurveyFormPart1Schema } from "../types";
import { InputField } from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SurveyFormPlatformSelectInput } from "./SurveyFormPlatformSelectInput";

interface Props {
  stepper: UseStepsReturn;
  form: UseFormReturn<SurveyFormPart1Schema>;
  onSubmit: (data: SurveyFormPart1Schema) => void;
}

export const SurveyFormPart1 = ({ form, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <SurveyFormPlatformSelectInput
        label="Music Platform"
        control={form.control}
        name="Platform"
        helperText="Choose your music platform, you may enter a custom platform if it is not listed."
      />
      <Heading size={"md"}>
        What is your top 10 played music this month?
      </Heading>
      <InputField
        isRequired
        label={"Music Top 1"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#1")}
        error={errors["Music_Top_#1"]}
      />
      <InputField
        isRequired
        label={"Music Top 2"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#2")}
        error={errors["Music_Top_#2"]}
      />
      <InputField
        isRequired
        label={"Music Top 3"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#3")}
        error={errors["Music_Top_#3"]}
      />
      <InputField
        isRequired
        label={"Music Top 4"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#4")}
        error={errors["Music_Top_#4"]}
      />
      <InputField
        isRequired
        label={"Music Top 5"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#5")}
        error={errors["Music_Top_#5"]}
      />
      <InputField
        isRequired
        label={"Music Top 6"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#6")}
        error={errors["Music_Top_#6"]}
      />
      <InputField
        isRequired
        label={"Music Top 7"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#7")}
        error={errors["Music_Top_#7"]}
      />
      <InputField
        isRequired
        label={"Music Top 8"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#8")}
        error={errors["Music_Top_#8"]}
      />
      <InputField
        isRequired
        label={"Music Top 9"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#9")}
        error={errors["Music_Top_#9"]}
      />
      <InputField
        isRequired
        label={"Music Top 10"}
        helperText="Ex. Vampire - Olivia Rodrigo, Cruel Summer - Taylor Swift,...etc."
        register={register("Music_Top_#10")}
        error={errors["Music_Top_#10"]}
      />

      <div className="flex w-full justify-between">
        <Button
          colorScheme="mongoose"
          isDisabled={props.stepper.activeStep === 0}
          onClick={() => props.stepper.goToPrevious()}
        >
          Go Back
        </Button>
        <Button
          colorScheme="mongoose"
          isDisabled={!form.formState.isValid}
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
};
