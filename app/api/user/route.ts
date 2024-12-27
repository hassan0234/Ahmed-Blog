import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newUser = await db.user.findMany();
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.log(`Error in creating post: ${error}`);
    return NextResponse.json(`Error ${error}}`);
  }
}
