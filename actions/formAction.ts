"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const formAction = async (form: FormData) => {
  const formData: z.infer<typeof formSchema> = {
    name: form.get("name") as string,
    email: form.get("email") as string,
    password: form.get("password") as string,
  };

  const result: any = formSchema.safeParse(formData);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }
  return {
    success: true,
    message: "Form submitted successfully",
  };
};
