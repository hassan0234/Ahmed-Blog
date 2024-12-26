"use server";

import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  age: z
    .number()
    .int()
    .min(18, {
      message: "You must be at least 18 years old.",
    })
    .optional(),
  MatricPass: z.boolean().default(false).optional(),
});
export const formAction = async (values: z.infer<typeof formSchema>) => {
  const validated = formSchema.safeParse(values);
  try {
    if (!validated.success) {
      throw new Error(validated.error.message);
    }
    return {
      success: true,
      message: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
