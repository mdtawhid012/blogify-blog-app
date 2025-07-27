"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <div className="flex gap-4">
          <Link href="/my-blogs">
            <Button
              className="cursor-pointer hover:scale-105 transition-all duration-300"
              variant="outline"
            >
              My Blogs
            </Button>
          </Link>

          <Link href="/blog/create">
            <Button className="cursor-pointer hover:scale-105 transition-all duration-300">
              Create Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-6 rounded-xl border hover:shadow-lg transition bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:hover:shadow-gray-800"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-muted-foreground line-clamp-3">
              {post.description}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              By {post.author?.name || "Unknown"}{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <Link href={`/blog/${post.slug}`}>
              <Button className="mt-4 hover:scale-105 transition-all duration-300 cursor-pointer">
                Read more
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
