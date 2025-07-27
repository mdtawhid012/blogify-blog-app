"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyBlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/my-blogs");

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load your blog posts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading your blog posts...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-lg text-red-600 dark:text-red-400 mb-4">
              {error}
            </p>
            <Button
              onClick={getPosts}
              className="cursor-pointer hover:scale-105 transition-all duration-300"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Blog Posts</h1>
        <div className="flex gap-4">
          <Link href="/blog">
            <Button
              className="cursor-pointer hover:scale-105 transition-all duration-300"
              variant="outline"
            >
              All Blogs
            </Button>
          </Link>

          <Link href="/blog/create">
            <Button className="cursor-pointer hover:scale-105 transition-all duration-300">
              Create Blog
            </Button>
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You haven&apos;t created any blog posts yet.
          </p>
          <Link href="/blog/create">
            <Button className="mt-4 cursor-pointer hover:scale-105 transition-all duration-300">
              Create Your First Blog
            </Button>
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
}
