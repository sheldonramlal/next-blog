
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
    let posts: PostWithAuthor[] = await getPosts();
    posts = posts.slice(0,4);

  return (
    <main className="w-full ">

      {/* Hero section */}
      <section className="w-full mx-auto max-w-7xl px-4 mt-16 lg:mt-24 ">
        <div className="flex flex-col items-center justify-center text-center  ">

          <h1 className="text-4xl lg:text-6xl tracking-tight font-medium wrap-normal ">Stories Worth Sharing</h1>
          <p className="mt-4 lg:mt-6 text-center font-medium text-black opacity-80 ">Read blogs from a growing community of writers.<br></br> Discover new perspectives or create an account and publish your own.
          </p>

          <div className="flex space-x-2 md:space-y-0 md:flex-row md:space-x-5 mt-10 md:mt-5 ">
            <button className=" lg:mt-8 px-6 py-3 border border-black rounded-md text-lg font-medium  cursor-pointer">
              <a href="/blogs" >
                Explore Blogs
              </a>
            </button>
            <button className=" lg:mt-8 px-6 py-3 bg-black text-white rounded-md text-lg font-medium cursor-pointer">
              <a href="/blogs/write-a-blog" >
                Share Your Story
              </a>
            </button>
          </div>
        </div>
      </section>

      {/* Latest articles section */}
      <section className="max-w-7xl mx-auto px-4 mt-20 mb-10">
        <div className="border-b border-gray-200 my-5"></div>
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
