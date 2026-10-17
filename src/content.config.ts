import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';
import { youtubeId } from './lib/video';

/** Text in both languages. Hindi is optional: pages fall back to English. */
const text = z.object({ en: z.string(), hi: z.string().optional() });

/** Association-wide facts from src/data/site.yaml, exposed as a single entry with id 'main'. */
const site = defineCollection({
  loader: file('src/data/site.yaml', { parser: (raw) => [{ id: 'main', ...parseYaml(raw) }] }),
  schema: z.object({
    name: text,
    short_name: text,
    registered: text,
    established: z.number().int(),
    address: text,
    email: z.email(),
    contact_people: z.array(reference('committee')),
    whatsapp_url: z.union([z.url(), z.literal('')]),
    map_query: z.string(),
  }),
});

const committee = defineCollection({
  // `order` is the position in the YAML file, so the file order is the display order.
  loader: file('src/data/committee.yaml', {
    parser: (raw) => parseYaml(raw).map((person: object, order: number) => ({ ...person, order })),
  }),
  schema: ({ image }) =>
    z.object({
      group: z.enum(['office', 'appointed', 'secretary', 'executive']),
      name: text,
      role: text,
      phone: z.string().regex(/^\d{10}$/, 'phone must be a 10-digit mobile number').optional(),
      photo: image().optional(),
      order: z.number(),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: text,
      date: z.coerce.date(),
      time: z.string().optional(),
      kind: z.enum(['seminar', 'webinar', 'meeting', 'community', 'celebration']),
      venue: text,
      summary: text,
      guests: z.array(z.object({ name: text, role: text })).default([]),
      partners: text.optional(),
      poster: image().optional(),
      photos: z.array(z.object({ src: image(), caption: text.optional() })).default([]),
      /** YouTube link to the recording. It is embedded on the event page. */
      video: z.url().refine((u) => youtubeId(u) !== null, 'video must be a YouTube link').optional(),
      body_hi: z.string().optional(),
    }),
});

const press = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/press' }),
  schema: z.object({
    outlet: z.string(),
    date: z.coerce.date(),
    url: z.url(),
    language: z.enum(['en', 'hi']),
    event: reference('events').optional(),
    headline: text,
    summary: text.optional(),
  }),
});

export const collections = { site, committee, events, press };
