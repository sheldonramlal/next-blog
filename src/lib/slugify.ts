import { prisma } from "@/src/lib/prisma"; 

export async function slugify(
  title: string,
  postId?: string
) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.post.findFirst({
      where: {
        slug,
        ...(postId && { NOT: { id: postId } }),
      },
      select: { id: true },
    });

    if (!existing) break;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
