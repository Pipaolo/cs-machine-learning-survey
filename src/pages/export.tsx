import Head from "next/head";
import { unparse } from "papaparse";
import { api } from "~/utils/api";
import { type SurveyRecord } from "~/features/survey";
import { Button, Heading, Text, useToast } from "@chakra-ui/react";
import { TRPCClientError } from "@trpc/client";

const ExportPage = () => {
  const exportRecords = api.survey.export.useMutation(undefined);
  const toast = useToast();

  const onExportPressed = async () => {
    try {
      const records = await exportRecords.mutateAsync();
      const csv = unparse<SurveyRecord>(records);

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "survey.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "Records Exported!",
        description: `You have successfully exported a total of ${records.length} records.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          title: "Error!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Error!",
        description: "An error has occurred while exporting records.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>CS Machine Learning | Spotify Survey Form</title>
        <meta
          name="description"
          content="A survey form created for research purposes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-sulu p-4">
        <div className="flex max-w-lg flex-col space-y-4 rounded-md bg-white p-4">
          <Heading size={"md"}> Export Records</Heading>
          <Text>
            This exports the overall records curated by our survey. Please do
            not abuse this functionality as this may cause instability to Air
            Table&apos;s API .
          </Text>
          <Button
            onClick={onExportPressed}
            colorScheme="mongoose"
            isLoading={exportRecords.isLoading}
          >
            Export
          </Button>
        </div>
      </main>
    </>
  );
};

export default ExportPage;
