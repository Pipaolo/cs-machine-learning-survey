import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { SurveyRecordSchema } from "~/features/survey/types";

export const surveyRouter = createTRPCRouter({
  getRecords: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.axios.get<{
      records: {
        id: string;
        fields: Record<string, unknown>;
      }[];
    }>("/appw5JshuvO8zbZnL/tbl8WLNPnQTt6Rn91/");

    const data = response.data;

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

      const response = await ctx.axios.post<{
        fields: Record<string, unknown>;
      }>("/appw5JshuvO8zbZnL/tbl8WLNPnQTt6Rn91/", {
        fields: input,
      });

      const data = response.data;

      if (data && data.fields) {
        return SurveyRecordSchema.parse(data.fields);
      }

      throw new TRPCError({
        message: "Failed to create record",
        code: "BAD_REQUEST",
      });
    }),
});
