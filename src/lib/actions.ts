"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession } from "@/src/lib/auth";
import {prisma} from "@/src/lib/prisma";
import { slugify } from "./slugify";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString() || null;


  if (!title || !content) {
    throw new Error("Missing fields");
  }

  const slug = await slugify(title);

  await prisma.post.create({
    data: {
      title,
      slug: slug,
      imageUrl,
      content,
      authorId: session.user.id,
      published: true,
    },
  });
  revalidatePath("/blogs");
  revalidatePath("/");
  redirect("/blogs");
}

export async function updatePost(formData: FormData) {
  const session = await getSession();
  if (!session?.user) throw new Error("Not authenticated");

  const postId = formData.get("postId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string | null;

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post || post.authorId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  


  let slug = post.slug;

  if (title !== post.title) {
    slug = await slugify(title, postId);
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      imageUrl: imageUrl || post.imageUrl,
      slug,
    },
  });

  revalidatePath("/blogs");
  revalidatePath("/");
  redirect(`/blogs/${updatedPost.slug}`);
}

export async function deletePost(postId: string){

  const session = await getSession();
  if (!session?.user) throw new Error("Not authenticated");

  const deletedPost = await prisma.post.delete({
    where: { 
      id: postId 
    },
  })
  revalidatePath("/blogs");
  revalidatePath("/");
  redirect("/blogs")

}