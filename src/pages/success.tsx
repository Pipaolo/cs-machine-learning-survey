import { Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function SuccessPage() {
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-sulu p-4">
        <div className="flex flex-col items-center space-y-4 rounded-md bg-white p-4">
          <Heading size={"lg"} className="text-center">
            Success!
          </Heading>
          <p className="text-center">
            Thank you for your submission. We appreciate your time.
          </p>
        </div>
      </main>
    </>
  );
}
