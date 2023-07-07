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
import { type SurveyFormPart2Schema } from "../types";
import { InputField } from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  stepper: UseStepsReturn;
  form: UseFormReturn<SurveyFormPart2Schema>;
  onSubmit: (data: SurveyFormPart2Schema) => void;
}

export const SurveyFormPart2 = ({ form, ...props }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <Heading size={"md"}>Who is your top 5 artist this month?</Heading>
      <InputField
        isRequired
        label={"Top Artist 1"}
        helperText="Ex. Ado, Eve, YOASOBI,..etc."
        register={register("Artist_#1")}
        error={errors["Artist_#1"]}
      />
      <InputField
        isRequired
        label={"Top Artist 2"}
        helperText="Ex. Ado, Eve, YOASOBI,..etc."
        register={register("Artist_#2")}
        error={errors["Artist_#2"]}
      />
      <InputField
        isRequired
        label={"Top Artist 3"}
        helperText="Ex. Ado, Eve, YOASOBI,..etc."
        register={register("Artist_#3")}
        error={errors["Artist_#3"]}
      />
      <InputField
        isRequired
        label={"Top Artist 4"}
        helperText="Ex. Ado, Eve, YOASOBI,..etc."
        register={register("Artist_#4")}
        error={errors["Artist_#4"]}
      />
      <InputField
        isRequired
        label={"Top Artist 5"}
        helperText="Ex. Ado, Eve, YOASOBI,..etc."
        register={register("Artist_#5")}
        error={errors["Artist_#5"]}
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
