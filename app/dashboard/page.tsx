import { redirect } from "next/navigation";
import { useSession, signOut } from "@/src/lib/auth-client";
import { getPostsByUser } from "@/src/lib/posts";
import BlogCard from "../components/BlogCards";
import LogoutButton from "../components/LogoutButton";
import { getSession } from "@/src/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect ("/sign-in");
  }
  const posts = await getPostsByUser(session.user.id);

  const { user } = session;

  return (
    <main className="max-w-7xl h-screen flex mt-20 flex-col mx-auto p-4 space-y-4 text-black">
      <div className="w-full ">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {user.name || "User"}!</p>
        {/* <p>Email: {user.email}</p> */}
      </div>
     
     <h2 className="text-2xl font-medium mt-10">All My Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
        {posts ? ( posts.map((post) => (
          <BlogCard title={post.title} slug={post.slug} key={post.slug} name={post.author.name} imageUrl={post.imageUrl} />
        )) ) : (
          <p>You have no blogs yet.</p>
        )}
      </div>
      

      {/* <LogoutButton /> */}
    </main>
  );
}