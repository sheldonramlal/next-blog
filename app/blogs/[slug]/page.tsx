import { getPostBySlug } from "@/src/lib/posts"
import { getSession } from "@/src/lib/auth"
import Link from "next/link"
import DeletePostBtn from "@/app/components/DeletePostBtn"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await getSession();

  const post = await getPostBySlug(slug)

  const isAuthor = session?.user?.id === post?.authorId;

  if (!post) return <p>Post not found</p>;
 
  return (
    <main className="w-full ">
        <section className="max-w-3xl mx-auto px-4 mt-16  ">
            <div>
                <h1 className="text-4xl lg:text-5xl tracking-tight font-medium wrap-normal">{post.title}</h1>
                <p className="mt-5 text-gray-600">By {post.author.name}</p>
                <p className="text-gray-600">Created on: {" "} 
                   {post.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600">Updated on: {" "}
                  {post.updatedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex gap-5 mt-5">
                  {isAuthor && (
                    <Link 
                          href={`/blogs/${post.slug}/edit`} 
                          className="inline-block text-sm px-3 py-2 rounded bg-black text-white font-medium"
                    >
                      Edit Post
                    </Link>
                  )}
                    
                  {isAuthor && (
                    <DeletePostBtn postId={post.id} />
                  )}
                </div>
                <div className="border-b border-gray-200 mt-5"></div>

                <p className="mt-5">{post.content}</p>
            </div>
        </section>
    </main>
  )
}
