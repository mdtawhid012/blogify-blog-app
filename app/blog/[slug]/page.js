"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { getToken, userId } = useAuth();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", content: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs?slug=${slug}`)
      .then((res) => res.json())
      .then((posts) => {
        const post = Array.isArray(posts)
          ? posts.find((p) => p.slug === slug)
          : posts;

        if (!post || !post.slug) {
          setNotFound(true);
          return;
        }

        setBlog(post);
        setForm({
          title: post.title,
          description: post.description,
          content: post.content,
        });
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  const isAuthor = blog?.author?.clerkId === userId;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = await getToken();
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      setBlog(updated);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setLoading(true);
    setError("");
    try {
      const token = await getToken();
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok && res.status !== 204) throw new Error(await res.text());
      router.push("/blog");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">404 – Blog Not Found</h1>
        <p className="text-gray-600 mb-6">
          The blog post you're looking for does not exist.
        </p>
        <Link href="/blog">
          <Button variant="outline">← Back to Blog</Button>
        </Link>
      </div>
    );
  }

  if (!blog)
    return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* <Link
        href="/blog"
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Blog
      </Link> */}

      {error && (
        <div className="mb-6 rounded-md bg-red-100 text-red-700 px-4 py-3 font-medium">
          ❌ {error}
        </div>
      )}

      {editMode ? (
        <form
          onSubmit={handleUpdate}
          className="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg p-8 rounded-xl"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Edit Blog Post
          </h1>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditMode(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{blog.title}</h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            By{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {blog.author?.name || "Unknown Author"}
            </span>
          </p>

          <p className="text-gray-500 dark:text-gray-400">{blog.description}</p>

          <div className="prose dark:prose-invert mt-6">{blog.content}</div>

          {isAuthor && (
            <div className="flex gap-4 mt-6">
              <Button onClick={() => setEditMode(true)}>Edit</Button>
              <Button
                className="bg-red-600 hover:bg-red-700 dark:text-white"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
