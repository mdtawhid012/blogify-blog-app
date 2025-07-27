"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const phrases = [
  "a simple blog.",
  "your writing space.",
  "a creative platform.",
  "a place for ideas.",
];

export default function Page() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (index === phrases.length) return;

    if (subIndex === phrases[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
        setText(phrases[index].substring(0, subIndex));
      },
      deleting ? 60 : 120
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div>
      <section className="container px-4 py-16 mx-auto lg:h-[34rem] lg:space-x-12 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl font-semibold leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            Blogify is{" "}
            <span className="text-primary underline decoration-primary">
              {text}
              <span className="ml-1">{blink ? "|" : " "}</span>
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Blogify is your modern writing companion — open source, beautifully
            minimal, and designed to help you focus on sharing ideas, not
            managing a platform.
          </p>
        </div>

        <div className="w-full mt-10 lg:mt-0 lg:w-1/2">
          <Image
            src="/main.svg"
            alt="Illustration of a person blogging"
            width={400}
            height={300}
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </section>
      <section className="container bg-gray-100 dark:bg-gray-800 px-4 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
        <div className="w-full lg:w-1/2">
          <Image
            src="/type.webp"
            alt="Writing process illustration"
            width={400}
            height={300}
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
        <div className="w-full mb-12 text-center lg:text-left lg:w-1/2 lg:mb-0">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
            Start writing in seconds
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            No setup. No distractions. Just you and your thoughts. Blogify lets
            you focus on what matters—your content.
          </p>
          <ul className="mt-6 space-y-3 text-left text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Instant markdown support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> Responsive, beautiful
              design
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">✓</span> 100% open-source
            </li>
          </ul>
          <SignedOut>
            <SignInButton>
              <span>
                <Button className="px-6 py-3 mt-8 hover:bg-primary/90 transition">
                  Sign in to Get Started
                </Button>
              </span>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/blog">
              <Button className="px-6 py-3 mt-8 hover:bg-primary/90 transition cursor-pointer">
                Get Started
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>
      <section className="container px-4 py-16 mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 md:text-3xl">
          What our users are saying
        </h2>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          From casual bloggers to seasoned developers, our community loves
          Blogify.
        </p>

        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="User avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Sophie L.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content Creator
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              &ldquo;Blogger makes it so easy to share my thoughts. I love the
              simplicity and clean UI!&rdquo;
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="User avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Jason M.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 ">
                  Frontend Developer
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              &ldquo;Writing with Blogify is a joy. The markdown support and
              open-source philosophy are spot-on.&rdquo;
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Ali K.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tech Blogger
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              &ldquo;Finally, a platform that&apos;s fast, beautiful, and
              doesn&apos;t get in my way when I&apos;m writing.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
