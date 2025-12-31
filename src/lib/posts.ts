import prisma from "@/src/lib/prisma";

export async function getPosts() {
  return prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}


export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
   include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}


export async function getPostsByUser(userId: string) {
  return prisma.post.findMany({
    where: {
       authorId: userId 
      },include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
       createdAt: "desc" } 
  })
} 