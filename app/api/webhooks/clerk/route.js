import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, email_addresses, first_name, last_name } = body.data;
    const email = email_addresses[0]?.email_address;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      await prisma.user.update({
        where: { email },
        data: {
          clerkId: id,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
        },
      });
    } else {
      await prisma.user.create({
        data: {
          clerkId: id,
          email,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
        },
      });
    }

    return new Response("User saved", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
