import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Contact Us
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
        Have a question or feedback? We'd love to hear from you.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            placeholder="Type your message..."
            rows={5}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
            required
          ></textarea>
        </div>

        <Button
          type="submit"
          className="w-full px-4 py-2 font-semibold bg-primary rounded-md hover:bg-primary/90 transition"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
