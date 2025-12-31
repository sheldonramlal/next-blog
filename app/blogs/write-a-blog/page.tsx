import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession } from "@/src/lib/auth";
import NewPostForm from "@/app/components/NewPostForm";

export default async function WriteBlogPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl font-medium text-center text-gray-900 antialiased">Create a New Blog Post</h1>
      <NewPostForm />
    </div>
  );
}
