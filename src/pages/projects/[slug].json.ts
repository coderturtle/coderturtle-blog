import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { entrySlug } from "../../lib/logs";

// One project's full metadata + ordered build-log timeline, build-time
// generated per project (this is a static site, so a dynamic JSON route
// still needs getStaticPaths like any other [slug] route).
export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}

export const GET: APIRoute = async ({ props, site }) => {
  const { project } = props as { project: Awaited<ReturnType<typeof getCollection<"projects">>>[number] };

  const entries = (await getCollection("logs", (entry) => entry.data.project.id === project.id && !entry.data.draft)).sort(
    (a, b) => {
      const byDate = b.data.date.getTime() - a.data.date.getTime();
      if (byDate !== 0) return byDate;
      return (b.data.order ?? 0) - (a.data.order ?? 0);
    }
  );

  const data = {
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
    log: entries.map((entry) => ({
      slug: entrySlug(entry.id),
      title: entry.data.title,
      date: entry.data.date.toISOString().slice(0, 10),
      kind: entry.data.kind,
      phase: entry.data.phase ?? null,
      summary: entry.data.summary,
      changeRefs: entry.data.changeRefs,
      tags: entry.data.tags,
      url: new URL(`/projects/${project.id}/log/${entrySlug(entry.id)}/`, site).toString(),
    })),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
