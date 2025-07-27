import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full mt-8">
      <SignUp className="flex justify-center items-center bg-white dark:bg-gray-900" />
    </div>
  );
}
