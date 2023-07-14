import {
  Button,
  Checkbox,
  Heading,
  Text,
  type UseStepsReturn,
  useToast,
  RadioGroup,
  Stack,
  VStack,
  Radio,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
        label={"Age"}
        register={register("Age")}
        error={errors["Age"]}
        type="number"
      />
      {/* Gender Field */}
      <Controller
        name="Sex"
        control={form.control}
        render={({ field, fieldState }) => {
          return (
            <FormControl isInvalid={!!fieldState.error} isRequired>
              <FormLabel>Sex</FormLabel>
              <RadioGroup {...field} className="w-full">
                <VStack alignItems={"start"} w={"full"}>
                  <Radio colorScheme="mongoose" value="male">
                    Male
                  </Radio>
                  <Radio colorScheme="mongoose" value="female">
                    Female
                  </Radio>
                </VStack>
              </RadioGroup>
              {fieldState.error && (
                <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              )}
            </FormControl>
          );
        }}
      />
      <InputField
        isRequired
        label={"College/School"}
        register={register("School")}
        error={errors["School"]}
        helperText="Example: CIIT College of Arts and Technology, AMA Computer College, and etc."
        type="text"
      />
      <InputField
        isRequired
        label={"Course"}
        register={register("Course")}
        error={errors["Course"]}
        helperText="Example: BS Computer Science, BS Information Technology, and etc."
      />
      <InputField
        isRequired
        label={"Year Level"}
        register={register("YearLevel")}
        error={errors["YearLevel"]}
        helperText="Example: 4th Year, 2nd Year, and etc."
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
