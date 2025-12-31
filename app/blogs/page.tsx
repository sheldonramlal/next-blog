// import { posts } from "../data/posts";
import BlogCard from "../components/BlogCards"
import { getPosts } from "@/src/lib/posts";

export default async function BlogPage() {

    type Post = {
    id: string;
    title: string;
    content: string;
    slug: string;
    published: boolean;
    authorId: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

    type PostWithAuthor = Post & { author: { id: string; name: string; email: string } };
    const posts: PostWithAuthor[] = await getPosts();

    return (
        <main className="w-full ">
            <section className="w-full mx-auto max-w-7xl px-4 mt-20">
                <h1 className="text-3xl font-medium text-center text-gray-900 antialiased">All Articles </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20">
                    {posts.map((post) => (
                        <BlogCard title={post.title} slug={post.slug} key={post.slug} name={post.author.name} imageUrl={post.imageUrl} />
                    ))}
         
                </div>
            </section>
        </main>
    )
}