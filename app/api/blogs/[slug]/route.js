import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function PATCH(req, { params }) {
  const { slug } = await params;
  const { userId } = getAuth(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const data = await req.json();

  const blog = await prisma.blogPost.findUnique({ where: { slug } });
  if (!blog) return new Response("Blog not found", { status: 404 });
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user || blog.authorId !== user.id)
    return new Response("Forbidden", { status: 403 });

  const updated = await prisma.blogPost.update({
    where: { slug },
    data: {
      title: data.title,
      description: data.description,
      content: data.content,
    },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { slug } = await params;
  const { userId } = getAuth(req);
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const blog = await prisma.blogPost.findUnique({ where: { slug } });
  if (!blog) return new Response("Blog not found", { status: 404 });
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user || blog.authorId !== user.id)
    return new Response("Forbidden", { status: 403 });

  await prisma.blogPost.delete({ where: { slug } });

  return new Response(null, { status: 204 });
}
