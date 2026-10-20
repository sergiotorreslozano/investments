import { defineCollection, z } from 'astro:content';

const analyses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    company: z.string().optional(),
    sector: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { analyses };