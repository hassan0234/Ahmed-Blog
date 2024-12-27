import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newPost = await db.post.create({
      data: {
        title: "Hello",
        content: "World",
        bannerImg:
          "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
        authorId: "user_2qlO5S40au6IoWZmLwrsiwrwR4q",
      },
    });
    return NextResponse.json(newPost, { status: 200 });
  } catch (error) {
    console.log(`Error in creating post: ${error}`);
  }
}
