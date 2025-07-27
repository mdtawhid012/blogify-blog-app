export default function AboutPage() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        About Blogify
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
        Blogify is a simple, modern, and open-source platform for writers and
        thinkers. Built with performance and minimalism in mind.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Our Philosophy
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Writing should be effortless. We focus on what matters most — your
            words. Blogify gives you a beautiful, distraction-free interface to
            write and publish with ease.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Built for Everyone
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you're a developer, storyteller, or student — Blogify is
            made for you. It's fully open source and completely free.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Contribute
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Blogify is open-source and community-driven. Feel free to submit
            issues, improvements, or even create your own version. Let’s build
            it together.
          </p>
        </div>
      </div>
    </div>
  );
}
