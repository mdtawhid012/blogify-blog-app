"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const router = useRouter(); // ✅ Correct usage of useRouter

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);
    try {
      const token = await getToken();
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, slug, description, content }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create post");
      }

      setSubmitted(true);
      setTitle("");
      setSlug("");
      setDescription("");
      setContent("");

      router.push("/blog"); // ✅ Redirect to blog page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Create New Blog</h1>

      {submitted && (
        <div className="mb-6 rounded-md bg-green-100 text-green-800 px-4 py-3 font-medium">
          ✅ Blog created successfully!
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-md bg-red-100 text-red-700 px-4 py-3 font-medium">
          ❌ {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-8 rounded-xl"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Slug{" "}
            <span className="text-xs text-gray-500">(e.g. my-first-post)</span>
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2"
            placeholder="Unique URL slug"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2"
            placeholder="Short summary of the blog"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2"
            placeholder="Write your blog content here..."
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white dark:text-gray-900 font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
}
