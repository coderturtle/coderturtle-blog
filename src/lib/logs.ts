// Shared helpers for the `logs` content collection.
//
// Log entries live on disk as src/content/logs/<project-slug>/<NNNN-title>.mdx
// so authors get natural chronological ordering and grouping for free. The
// public URL drops the numeric prefix (kept only for on-disk sort order) and
// the project folder (the project comes from the `project` frontmatter
// reference, not the path) to get a clean /projects/<slug>/log/<entry>/ URL.
export function entrySlug(id: string): string {
  const filename = id.split("/").pop() ?? id;
  return filename.replace(/^\d+-/, "");
}
