import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

// NOTE: this is the canonical Astro 5 content config location. A legacy
// `src/content/config.ts` previously shadowed by this file defined `tags`
// and `readingTime` fields that pages referenced but this schema never
// actually had, so those fields silently rendered as undefined. Reconciled
// to this single source of truth, then the old `blog` collection was
// replaced entirely by `projects` + `logs`: projects are the primary
// navigational unit, and a project's build log is a timeline of `logs`
// entries referencing it via `reference('projects')`.
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		tagline: z.string(),
		// Curated agent-facing abstract; also used in /llms.txt and JSON endpoints.
		summary: z.string(),
		status: z.enum(['building', 'shipped', 'paused', 'archived', 'experiment']),
		startDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		order: z.number().default(0),
		featured: z.boolean().default(false),
		stack: z.array(z.string()).default([]),
		repo: z.string().url().optional(),
		liveUrl: z.string().url().optional(),
		heroImage: image().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const logs = defineCollection({
	loader: glob({ base: './src/content/logs', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		project: reference('projects'),
		title: z.string(),
		date: z.coerce.date(),
		order: z.number().optional(),
		phase: z.string().optional(),
		summary: z.string(),
		kind: z.enum(['build', 'decision', 'fix', 'experiment', 'retro']).default('build'),
		heroImage: image().optional(),
		// Curated, hand-authored links to internal .hekton/change-log.yaml CHG-
		// entries. Never auto-synced — see CLAUDE.md on keeping adoption
		// metadata separate from product content.
		changeRefs: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

// Self-paced workshops, each its own repo/site on a coderturtle.io subdomain
// (via agentic-infra-lab's github-pages-dns pattern). Distinct from `projects`:
// a workshop teaches something to a learner, a project is a build with a log.
// `status` mirrors real content-completion state (module count), not intent -
// keep this honest against each workshop's own README "Current status" line,
// not aspirational.
const workshops = defineCollection({
	loader: glob({ base: './src/content/workshops', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		title: z.string(),
		tagline: z.string(),
		summary: z.string(),
		status: z.enum(['shipped', 'building']),
		moduleProgress: z.string(),
		liveUrl: z.string().url(),
		repo: z.string().url().optional(),
		startDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		order: z.number().default(0),
		featured: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { projects, logs, workshops };
