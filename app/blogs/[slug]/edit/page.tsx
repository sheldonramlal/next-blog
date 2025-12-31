import { redirect, notFound } from "next/navigation";
import { getSession } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import EditPostForm from "@/app/components/EditPostForm";

type Props = {
  params: { slug: string };
};


export default async function EditPostPage({ params }: Props) {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");

  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  // 🔐 Authorization check
  if (post.authorId !== session.user.id) {
    redirect("/blogs");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditPostForm post={post} />
    </main>
  );
}
