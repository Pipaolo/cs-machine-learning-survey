import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type SurveyRecord, SurveyRecordSchema } from "~/features/survey/types";
import { AxiosError } from "axios";

type AirTableListRecordsResponse = {
  records: {
    id: string;
    fields: Record<string, unknown>;
  }[];
  offset?: string;
};

export const surveyRouter = createTRPCRouter({
  export: publicProcedure.mutation(async ({ ctx }) => {
    const records: SurveyRecord[] = [];

    // To get all records, we need to paginate through the records
    // The API returns a maximum of 100 records per request
    // If there are more records, the API will return an offset
    // We can use the offset to get the next 100 records
    // We can keep doing this until there are no more records
    const baseUrl = "/appw5JshuvO8zbZnL/tbl8WLNPnQTt6Rn91/";
    const initialResponse = await ctx.axios.get<AirTableListRecordsResponse>(
      baseUrl
    );

    const initialData = initialResponse.data;
    if (initialData && initialData.records) {
      records.push(
        ...initialData.records.map((record) => {
          return SurveyRecordSchema.parse(record.fields);
        })
      );
    }

    let hasMoreRecords = !!initialData.offset;
    let offset = initialData.offset;
    while (hasMoreRecords) {
      const response = await ctx.axios.get<AirTableListRecordsResponse>(
        `${baseUrl}?offset=${offset ?? ""}`
      );

      const data = response.data;

      if (!data) {
        break;
      }

      if (!data.records) {
        break;
      }

      records.push(
        ...data.records.map((record) => {
          return SurveyRecordSchema.parse(record.fields);
        })
      );

      hasMoreRecords = !!data.offset;
      offset = data.offset;
    }

    return records;
  }),
  getRecords: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.axios.get<{
      records: {
        id: string;
        fields: Record<string, unknown>;
      }[];
    }>("/appw5JshuvO8zbZnL/tbl8WLNPnQTt6Rn91/");

    const data = response.data;
    console.log(data);

    if (data && data.records) {
      return data.records.map((record) => {
        return SurveyRecordSchema.parse(record.fields);
      });
    }

    return [];
  }),
  createRecord: publicProcedure
    .input(SurveyRecordSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if the user has already submitted a survey
      const recordsResponse = await ctx.axios.get<{
        records: {
          id: string;
          fields: Record<string, unknown>;
        }[];
      }>(
        `/appw5JshuvO8zbZnL/tbl8WLNPnQTt6Rn91?fields%5B%5D=User+Email&filterByFormula=%7BUser+Email%7D%3D%22${input["User Email"]}%22`
      );

      const records = recordsResponse.data ?? [];

      const isExistingRecord = records.records.some((record) => {
        const email = record.fields["User Email"] as string;
        return email === input["User Email"];
      });

      if (isExistingRecord) {
        throw new TRPCError({
          message: "You have already submitted a survey",
          code: "BAD_REQUEST",
        });
      }

      console.log("input", input);
      try {
        const response = await ctx.axios.post<{
          fields: Record<string, unknown>;
        }>("/appw5JshuvO8zbZnL/tbl8WLNPnQTt6Rn91/", {
          fields: input,
          typecast: true,
        });

        const data = response.data;

        if (data && data.fields) {
          return SurveyRecordSchema.parse(data.fields);
        }

        throw new TRPCError({
          message: "Failed to create record",
          code: "BAD_REQUEST",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError;
          const response = axiosError.response as unknown as {
            data: {
              error: {
                message: string;
              };
            };
          };

          throw new TRPCError({
            message: `${response?.data?.error?.message}`,
            code: "BAD_REQUEST",
          });
        }
      }
    }),
});
