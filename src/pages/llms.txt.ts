import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { entrySlug } from "../lib/logs";

// A plain-text index for agents, following the emerging llms.txt convention:
// what this site is, where the real content lives, and where the
// machine-readable (JSON/RSS/sitemap) mirrors of that content are. Build-time
// generated from the `projects`/`logs` collections so it can't drift from
// what the site actually shows — never hand-maintained.
export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).toString();

  const projects = (await getCollection("projects")).sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    const aDate = a.data.updatedDate ?? a.data.startDate;
    const bDate = b.data.updatedDate ?? b.data.startDate;
    return bDate.getTime() - aDate.getTime();
  });

  const recentEntries = (await getCollection("logs", (entry) => !entry.data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 10);

  const lines: string[] = [];

  lines.push(`# ${SITE_TITLE}`);
  lines.push("");
  lines.push(SITE_DESCRIPTION);
  lines.push("");
  lines.push(
    "Coderturtle is the hands-on builder voice in the Hekton ecosystem, the practical counterpart to Agentic Tekton's architecture/thought-leadership voice. Content here is organized around real projects and their build logs, not blog posts: each project page carries its full timeline, and every build-log entry is individually addressable."
  );
  lines.push("");

  lines.push("## Projects");
  for (const project of projects) {
    lines.push(`- [${project.data.title}](${abs(`/projects/${project.id}/`)}): ${project.data.tagline}`);
  }
  lines.push("");

  lines.push("## Recent build-log entries");
  for (const entry of recentEntries) {
    const entryUrl = abs(`/projects/${entry.data.project.id}/log/${entrySlug(entry.id)}/`);
    const date = entry.data.date.toISOString().slice(0, 10);
    lines.push(`- [${entry.data.title}](${entryUrl}) (${date}, ${entry.data.kind}): ${entry.data.summary}`);
  }
  lines.push("");

  lines.push("## Machine-readable");
  lines.push(`- Project index (JSON): ${abs("/projects/index.json")}`);
  lines.push(
    `- Per-project detail (JSON): append ".json" to any project URL above, e.g. ${site!.origin}/projects/<slug>.json`
  );
  lines.push(`- RSS feed (build-log entries): ${abs("/rss.xml")}`);
  lines.push(`- Sitemap: ${abs("/sitemap-index.xml")}`);
  lines.push("");

  lines.push("## Provenance");
  lines.push(
    "Build-log entries are curated by the site owner, with agent assistance disclosed rather than hidden. An entry may cite internal Hekton change-log ids in its `changeRefs` field as plain references; the internal `.hekton/` control-plane data itself is intentionally not served here."
  );

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
