import {
  Box,
  Button,
  Checkbox,
  Heading,
  Progress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
  useToast,
} from "@chakra-ui/react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SurveyFormPart1Schema,
  SurveyFormPart2Schema,
  SurveyFormPart3Schema,
  SurveyFormPersonalSchema,
  type SurveyFormSchema,
} from "../types";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";
import { SurveyFormPart1 } from "./SurveyFormPart1";
import { SurveyFormPart2 } from "./SurveyFormPart2";
import { SurveyFormPart3 } from "./SurveyFormPart3";
import { SurveyFormPersonal } from "./SurveyFormPersonal";
import { useState } from "react";

export const SurveyForm = () => {
  const formPersonal = useForm<SurveyFormPersonalSchema>({
    resolver: zodResolver(SurveyFormPersonalSchema),
    mode: "all",
  });

  const formPart1 = useForm<SurveyFormPart1Schema>({
    resolver: zodResolver(SurveyFormPart1Schema),
    mode: "all",
  });

  const formPart2 = useForm<SurveyFormPart2Schema>({
    resolver: zodResolver(SurveyFormPart2Schema),
    mode: "all",
  });

  const formPart3 = useForm<SurveyFormPart3Schema>({
    resolver: zodResolver(SurveyFormPart3Schema),
    mode: "all",
  });

  const createRecord = api.survey.createRecord.useMutation();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async () => {
    try {
      // Construct the data to be submitted
      const data: SurveyFormSchema = {
        ...formPersonal.getValues(),
        ...formPart1.getValues(),
        ...formPart2.getValues(),
        ...formPart3.getValues(),
      };

      await createRecord.mutateAsync(data);
      toast({
        title: "Success",
        description: "Thank you for your submission. We appreciate your time.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      await router.push("/success");
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Error",
        description:
          "There was an error with your submission. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onInvalid = (error: FieldErrors<SurveyFormSchema>) => {
    toast({
      title: "Error",
      description: "There was an error with your submission. Please try again.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const steps = [
    {
      title: "Step 1",
      description: "Personal Info",
    },
    {
      title: "Step 2",
      description: "Top 10 Music",
    },
    {
      title: "Step 3",
      description: "Top 5 Artists",
    },
    {
      title: "Step 4",
      description: "Top 5 Genres",
    },
  ];

  const stepper = useSteps({
    count: steps.length,
    index: 0,
  });

  const renderContent = () => {
    switch (stepper.activeStep) {
      case 0:
        return (
          <SurveyFormPersonal
            form={formPersonal}
            onSubmit={() => {
              stepper.goToNext();
            }}
            stepper={stepper}
          />
        );
      case 1:
        return (
          <SurveyFormPart1
            form={formPart1}
            onSubmit={() => {
              stepper.goToNext();
            }}
            stepper={stepper}
          />
        );
      case 2:
        return (
          <SurveyFormPart2
            form={formPart2}
            onSubmit={() => {
              stepper.goToNext();
            }}
            stepper={stepper}
          />
        );
      case 3:
        return (
          <SurveyFormPart3
            form={formPart3}
            onSubmit={(_) => {
              void onSubmit();
            }}
            isLoading={createRecord.isLoading}
            stepper={stepper}
          />
        );
    }
  };

  return (
    <div className=" flex w-full max-w-xl flex-col space-y-4 rounded-xl bg-white p-4 shadow-md">
      <div className="flex flex-col items-start space-y-4 text-charade">
        <Heading size={"lg"} className="text-center">
          Spotify Survey Form
        </Heading>
        <Text>
          This is a survey form created for research purposes. It is a part of
          the CS Machine Learning project.
          <br />
          <br />
          By answering this survey, you agree that this data will be used for
          research purposes.
        </Text>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <span className="text-xl font-bold">
            Step {stepper.activeStep + 1} |{" "}
            {steps[stepper.activeStep]?.description}
          </span>
          <Progress
            colorScheme="mongoose"
            value={stepper.activeStepPercent * 100}
            rounded={"full"}
            size={"md"}
            width="full"
          />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};
