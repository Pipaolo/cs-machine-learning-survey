import { z } from "zod";
import { ValidationErrors } from "~/utils/errors";
import camelcaseKeys from "camelcase-keys";

export const SurveyFormSchema = z.object({
  Name: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  "User Email": z
    .string({
      required_error: ValidationErrors.required,
    })
    .email(ValidationErrors.email)
    // This makes sure that the email is a school email and ends with .edu.ph
    .regex(/\.edu\.ph$/, ValidationErrors.schoolEmail),
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

  Music_Genres_1: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Music_Genres_2: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Music_Genres_3: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Music_Genres_4: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Music_Genres_5: z
    .string({
      required_error: ValidationErrors.required,
    })
    .min(1, ValidationErrors.required),
  Permission: z.literal<boolean>(true, {
    required_error: ValidationErrors.required,
  }),
});

export type SurveyFormSchema = z.infer<typeof SurveyFormSchema>;
/**
 * 
 *   'Music_Top_#2': 'Cruel Summer - Taylor Swift',
  'Music_Top_#9': 'Tally - Blackpink',
  'Music_Top_#6': 'Shutdown - Blackpink',
  'Artist_#3': 'Jisoo',
  'Music_Top_#10': 'Gone - Rose',
  Music_Genres_4: 'Pop',
  'User Email': 'paolo.tolentino@ciit.edu.ph',
  'Music_Top_#4': 'Stay - Blackpink',
  Music_Genres_5: 'OPM',
  Music_Genres_2: 'Wellness',
  Name: 'Paolo Tolentino',
  'Music_Top_#5': 'Money - Lisa',
  Music_Genres_1: 'In the car',
  'Music_Top_#1': 'Vampire - Olivia Rodrigo',
  Music_Genres_3: 'Pride',
  'Artist_#1': 'Rose',
  Permission: true,
  'Artist_#5': 'IU',
  'Music_Top_#7': 'Pink Venom - Blackpink',
  'Artist_#2': 'Lisa',
  'Music_Top_#3': 'How You Like That - Blackpink',
  'Music_Top_#8': 'Typa Girl - Blackpink',
  'Artist_#4': 'Jennie'
 */
export const SurveyRecordSchema = z.object({
  Name: z.string(),
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
