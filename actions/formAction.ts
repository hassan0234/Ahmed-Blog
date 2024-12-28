"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import * as z from "zod";

type FormActionResponse = {
  success: boolean;
  message: string;
};
const postFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content cannot exceed 5000 characters"),
  imageUrl: z.string().min(5, "Img Must Be Provided"),
});

export async function formAction(
  data: z.infer<typeof postFormSchema>
): Promise<FormActionResponse> {
  try {
    const validatedData = postFormSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error(validatedData.error?.errors[0].message);
    }
    // Save the post to the database
    const { userId }: any = await auth();
    const newPost = await db.post.create({
      data: {
        title: data.title,
        content: data.content,
        bannerImg: data.imageUrl,
        author: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });
    if (!newPost) {
      throw new Error("Error creating post Internal Server Error");
    }
    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
