import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    image: z.union([image(), z.string()]),
    price_range: z.string().optional(),
    youtube_url: z.string().optional(),
    featured: z.boolean().default(false),
    specs: z.object({
      age: z.number(),
      gender: z.string(),
      height: z.string(),
      level: z.string(),
    }).optional(),
  }),
});

export const collections = {
  'portfolio': portfolio,
};
