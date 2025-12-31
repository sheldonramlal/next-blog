"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession } from "@/src/lib/auth";
import {prisma} from "@/src/lib/prisma";
import { slugify } from "./slugify";
import path from "path";
import fs from "fs/promises";

export async function createPost(formData: FormData) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const image = formData.get("image") as File | null;

   let imageUrl: string | null = null;

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${image.name.replace(/\s/g, "")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(`${uploadDir}/${fileName}`, buffer);

    imageUrl = `/uploads/${fileName}`;
  }

  if (!title || !content) {
    throw new Error("Missing fields");
  }

  await prisma.post.create({
    data: {
      title,
      slug: slugify(title),
      imageUrl,
      content,
      authorId: session.user.id,
      published: true,
    },
  });

  redirect("/blogs");
}

export async function updatePost(formData: FormData) {
  const session = await getSession();
  if (!session?.user) throw new Error("Not authenticated");

  const postId = formData.get("postId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File | null;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post || post.authorId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  let imageUrl = post.imageUrl;

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${image.name.replace(/\s/g, "")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(`${uploadDir}/${fileName}`, buffer);

    imageUrl = `/uploads/${fileName}`;
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      imageUrl,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    },
  });

  redirect(`/blogs/${post.slug}`);
}

export async function deletePost(postId: string){

  const session = await getSession();
  if (!session?.user) throw new Error("Not authenticated");

  const deletedPost = await prisma.post.delete({
    where: { 
      id: postId 
    },
  })
  redirect("/blogs")

}