import { z } from "zod";
import { ValidationErrors } from "~/utils/errors";

export const SurveyFormPersonalSchema = z.object({
  Name: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Age: z.coerce.number().min(1, ValidationErrors.required),
  School: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Course: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  YearLevel: z.coerce
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Sex: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  "User Email": z
    .string({
      required_error: ValidationErrors.required,
    })
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      ValidationErrors.email
    )
    // This makes sure that the email is a school email and ends with .edu.ph
    .regex(/\.edu\.ph$/, ValidationErrors.schoolEmail),
});

export type SurveyFormPersonalSchema = z.infer<typeof SurveyFormPersonalSchema>;

export const SurveyFormPart1Schema = z.object({
  Platform: z.string().min(1, ValidationErrors.required),
  "Music_Top_#1": z.string().min(1, ValidationErrors.required),
  "Music_Top_#2": z.string().min(1, ValidationErrors.required),
  "Music_Top_#3": z.string().min(1, ValidationErrors.required),
  "Music_Top_#4": z.string().min(1, ValidationErrors.required),
  "Music_Top_#5": z.string().min(1, ValidationErrors.required),
  "Music_Top_#6": z.string().min(1, ValidationErrors.required),
  "Music_Top_#7": z.string().min(1, ValidationErrors.required),
  "Music_Top_#8": z.string().min(1, ValidationErrors.required),
  "Music_Top_#9": z.string().min(1, ValidationErrors.required),
  "Music_Top_#10": z.string().min(1, ValidationErrors.required),
});

export type SurveyFormPart1Schema = z.infer<typeof SurveyFormPart1Schema>;

export const SurveyFormPart2Schema = z.object({
  "Artist_#1": z.string().min(1, ValidationErrors.required),
  "Artist_#2": z.string().min(1, ValidationErrors.required),
  "Artist_#3": z.string().min(1, ValidationErrors.required),
  "Artist_#4": z.string().min(1, ValidationErrors.required),
  "Artist_#5": z.string().min(1, ValidationErrors.required),
});

export type SurveyFormPart2Schema = z.infer<typeof SurveyFormPart2Schema>;

export const SurveyFormPart3Schema = z.object({
  Music_Genres_1: z.string().min(1, ValidationErrors.required),
  Music_Genres_2: z.string().min(1, ValidationErrors.required),
  Music_Genres_3: z.string().min(1, ValidationErrors.required),
  Music_Genres_4: z.string().min(1, ValidationErrors.required),
  Music_Genres_5: z.string().min(1, ValidationErrors.required),
  Permission: z.literal<boolean>(true, {
    required_error: ValidationErrors.required,
  }),
});

export type SurveyFormPart3Schema = z.infer<typeof SurveyFormPart3Schema>;

export const SurveyFormSchema = SurveyFormPersonalSchema.extend({
  ...SurveyFormPart1Schema.shape,
  ...SurveyFormPart2Schema.shape,
  ...SurveyFormPart3Schema.shape,
});

export type SurveyFormSchema = z.infer<typeof SurveyFormSchema>;

export const SurveyRecordSchema = z.object({
  Name: z.string(),
  Age: z.coerce.number().min(1, ValidationErrors.min(1)),
  Sex: z.string(),
  "User Email": z.string(),
  "Music_Top_#1": z.string().min(1, ValidationErrors.required),
  "Music_Top_#2": z.string().min(1, ValidationErrors.required),
  "Music_Top_#3": z.string().min(1, ValidationErrors.required),
  "Music_Top_#4": z.string().min(1, ValidationErrors.required),
  "Music_Top_#5": z.string().min(1, ValidationErrors.required),
  "Music_Top_#6": z.string().min(1, ValidationErrors.required),
  "Music_Top_#7": z.string().min(1, ValidationErrors.required),
  "Music_Top_#8": z.string().min(1, ValidationErrors.required),
  "Music_Top_#9": z.string().min(1, ValidationErrors.required),
  "Music_Top_#10": z.string().min(1, ValidationErrors.required),

  "Artist_#1": z.string().min(1, ValidationErrors.required),
  "Artist_#2": z.string().min(1, ValidationErrors.required),
  "Artist_#3": z.string().min(1, ValidationErrors.required),
  "Artist_#4": z.string().min(1, ValidationErrors.required),
  "Artist_#5": z.string().min(1, ValidationErrors.required),

  Music_Genres_1: z.string(),
  Music_Genres_2: z.string(),
  Music_Genres_3: z.string(),
  Music_Genres_4: z.string(),
  Music_Genres_5: z.string(),
  Permission: z.boolean(),
});

export type SurveyRecord = z.infer<typeof SurveyRecordSchema>;
