import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    // const { userId, sessionId } = auth();
    const { userId, sessionId } = getAuth(req);
    // console.log("Clerk userId:", userId, "sessionId:", sessionId);

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { title, slug, description, content } = await req.json();

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        description,
        content,
        authorId: user.id,
      },
      include: { author: true },
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(posts), { status: 200 });
}
