import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string(),
    readingTime: z.number().optional(),
    tags: z.array(z.string()).optional()
  }),
  // ✅ This ensures slugs are auto-generated from filename
  slug: ({ defaultSlug }) => defaultSlug,
});

export const collections = {
  blog,
};
