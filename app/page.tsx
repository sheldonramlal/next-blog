import Image from "next/image";
import Link from "next/link";
import BlogCard from "./components/BlogCards";
import { getPosts } from "@/src/lib/posts";



export default async function Home() {
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

      {/* Hero section */}
      <section className="w-full mx-auto max-w-7xl px-4 mt-16 lg:mt-24 ">
        <div className="flex flex-col items-center justify-center text-center  ">

          <h1 className="text-4xl lg:text-6xl tracking-tight font-medium wrap-normal ">Discover our latest news</h1>
          <p className="mt-4 lg:mt-6 text-center font-medium text-black opacity-80 ">Discover the achievements that set us apart. From groundbreaking projects to industry acolades,<br></br>
             we take pride in our accomplishments.
          </p>
        </div>
      </section>

      {/* Latest articles section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl lg:text-4xl tracking-tight font-medium">Latest articles</h2>
       
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
          {posts.map((post) => (
              <BlogCard title={post.title} slug={post.slug} key={post.slug} name={post.author.name} imageUrl={post.imageUrl} />
          ))}

          
        </div>
      </section>
    </main>
  );
}
