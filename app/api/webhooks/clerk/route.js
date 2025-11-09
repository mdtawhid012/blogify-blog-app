import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook received:", body);

    // Check if the webhook has the expected structure
    if (!body.data) {
      console.error("Invalid webhook structure:", body);
      return new Response("Invalid webhook structure", { status: 400 });
    }

    const { id, email_addresses, first_name, last_name } = body.data;

    // Check if email_addresses exists and has at least one email
    if (!email_addresses || !email_addresses.length) {
      console.error("No email addresses found in webhook:", body);
      return new Response("No email address found", { status: 400 });
    }

    const email = email_addresses[0]?.email_address;

    if (!email) {
      console.error("Invalid email address:", email_addresses);
      return new Response("Invalid email address", { status: 400 });
    }

    console.log("Processing user:", { id, email, first_name, last_name });

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log("Updating existing user:", email);
        await prisma.user.update({
          where: { email },
          data: {
            clerkId: id,
            name: `${first_name || ""} ${last_name || ""}`.trim(),
          },
        });
      } else {
        console.log("Creating new user:", email);
        await prisma.user.create({
          data: {
            clerkId: id,
            email,
            name: `${first_name || ""} ${last_name || ""}`.trim(),
          },
        });
      }

      console.log("User saved successfully");
      return new Response("User saved", { status: 200 });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return new Response("Database error", { status: 500 });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
