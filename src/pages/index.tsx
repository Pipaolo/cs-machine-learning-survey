import Head from "next/head";
import Link from "next/link";
import { SurveyForm } from "~/features/survey/components";
import { api } from "~/utils/api";

export default function Home() {
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
        <SurveyForm />
      </main>
    </>
  );
}
