import { Button, Checkbox, Heading, Text, useToast } from "@chakra-ui/react";
import { useForm, type FieldErrors, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SurveyFormSchema } from "../types";
import { InputField } from "~/components";
import { SurveyFormGenreSelectInput } from "./SurveyFormGenreSelectInput";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { TRPCError } from "@trpc/server";
import { TRPCClientError } from "@trpc/client";

export const SurveyForm = () => {
  const form = useForm<SurveyFormSchema>({
    resolver: zodResolver(SurveyFormSchema),
  });
  const createRecord = api.survey.createRecord.useMutation();
  const router = useRouter();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SurveyFormSchema) => {
    try {
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

  return (
    <div className=" flex w-full max-w-lg flex-col space-y-4 rounded-xl bg-white p-4 shadow-md">
      <div className="flex flex-col items-start space-y-4 text-charade">
        <Heading size={"lg"} className="text-center">
          Spotify Survey Form
        </Heading>
        <Text>
          This is a survey form created for research purposes. It is a part of
          the CS Machine Learning project.
        </Text>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col space-y-4"
      >
        <Heading size={"md"}>
          What is your top 10 played music this month?
        </Heading>
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
        <Button
          type="submit"
          isLoading={createRecord.isLoading}
          isDisabled={!form.formState.isValid || createRecord.isLoading}
          className="rounded-full bg-mongoose hover:bg-opacity-50"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
