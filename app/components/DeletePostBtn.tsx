"use client";

import { deletePost } from "@/src/lib/actions"


export default function DeletePostBtn( {postId } : { postId: string }) {
 return (
     <button 
     onClick={() => deletePost(postId)}             
     className="inline-block text-sm px-3 py-1 rounded bg-red-600 text-white cursor-pointer font-medium"
     >
      Delete Post
   </button>
)
}