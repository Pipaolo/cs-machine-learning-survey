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
import { type SurveyFormPersonalSchema, SurveyRecord } from "../types";
import { InputField } from "~/components";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  onSubmit: (data: SurveyFormPersonalSchema) => void;
  form: UseFormReturn<SurveyFormPersonalSchema>;
  stepper: UseStepsReturn;
}

export const SurveyFormPersonal = ({ form, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <InputField
        isRequired
        label={"Name"}
        register={register("Name")}
        error={errors["Name"]}
      />
      <InputField
        isRequired
        label={"Email"}
        helperText="This will be used for identifying your school.
          Please use an email address that ends with edu.ph"
        register={register("User Email")}
        error={errors["User Email"]}
      />
      <div className="flex w-full justify-end">
        <Button
          className="rounded-full bg-sulu hover:bg-opacity-50"
          isDisabled={!form.formState.isValid}
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
};
