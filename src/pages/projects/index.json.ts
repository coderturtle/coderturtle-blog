import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Build-time generated project index for agents/tooling. Never hand-edited —
// always regenerated from the `projects` collection, so it can't drift from
// what the site actually shows.
export const GET: APIRoute = async ({ site }) => {
  const projects = (await getCollection("projects")).sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    const aDate = a.data.updatedDate ?? a.data.startDate;
    const bDate = b.data.updatedDate ?? b.data.startDate;
    return bDate.getTime() - aDate.getTime();
  });

  const data = projects.map((project) => ({
    slug: project.id,
    title: project.data.title,
    tagline: project.data.tagline,
    summary: project.data.summary,
    status: project.data.status,
    startDate: project.data.startDate.toISOString().slice(0, 10),
    updatedDate: project.data.updatedDate ? project.data.updatedDate.toISOString().slice(0, 10) : null,
    stack: project.data.stack,
    tags: project.data.tags,
    repo: project.data.repo ?? null,
    liveUrl: project.data.liveUrl ?? null,
    url: new URL(`/projects/${project.id}/`, site).toString(),
    detailUrl: new URL(`/projects/${project.id}.json`, site).toString(),
  }));

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
