# Decisions

Append-only decision log for Coderturtle.io.

## 2026-06-28 - Adopt as Hekton factory output

Coderturtle.io is classified as a `factory-output` project because it is a public website/blog deliverable maintained by the factory. It is not shared Hekton machinery and does not have a lab-style promotion target.

## 2026-06-28 - Preserve existing Git history

The repo was cloned from GitHub and kept as a normal Git repository rather than being re-created from a new scaffold. Adoption adds Hekton metadata and docs only; product behavior, dependency versions, and source files remain unchanged.

## 2026-06-28 - Keep live vault mutation disabled

The project proposes `20-projects/factory-output/coderturtle.io` as its mind-palace path, but this adoption session does not write to the live Obsidian vault. Repo-local `mind-palace/` files are the draft control plane until the user approves a sync.
