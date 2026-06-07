import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    pillars: z.array(z.string()),
    role: z.string(),
    skills: z.array(z.string()),
    featured: z.boolean().default(false),
    sortOrder: z.number(),
    heroAsset: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional()
    }),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          kind: z.enum(['link', 'download']).default('link'),
          note: z.string().optional(),
          available: z.boolean().default(true)
        })
      )
      .default([]),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional()
    })
  })
});

export const collections = { projects };

