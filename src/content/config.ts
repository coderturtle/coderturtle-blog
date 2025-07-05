import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      readingTime: z.number().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
