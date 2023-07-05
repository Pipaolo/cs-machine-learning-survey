// import Airtable from "airtable";

// const globalForAirtable = globalThis as unknown as { airtable: Airtable | undefined };

// export const airtable = globalForAirtable.airtable ?? Airtable.configure({})

import Axios from "axios";
import { env } from "~/env.mjs";

const globalForAxios = globalThis as unknown as {
  axios: typeof Axios | undefined;
};

export const axios =
  globalForAxios.axios ??
  Axios.create({
    baseURL: "https://api.airtable.com/v0",
    headers: {
      Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
    },
  });
