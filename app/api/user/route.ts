import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  try {
    const newUser: any = await db.post.findMany({
      where: {
        author: {
          clerkId: userId as string,
        },
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.log(`Error in creating post: ${error}`);
    return NextResponse.json(`Error ${error}}`);
  }
}
