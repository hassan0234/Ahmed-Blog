import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console

  const eventType = evt.type;
  try {
    if (eventType === "user.created") {
      await db.user.create({
        data: {
          clerkId: payload.data.id,
          username: payload.data.username,
          imageUrl: payload.data.image_url,
          email: payload.data.email_addresses[0].email_address,
        },
      });
    }
  } catch (error) {
    console.log(`Error in User Creation: ${error}`);
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        clerkId: payload.data.id,
      },
      data: {
        clerkId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        email: payload.data.email_addresses[0].email_address,
      },
    });
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        clerkId: payload.data.id,
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
