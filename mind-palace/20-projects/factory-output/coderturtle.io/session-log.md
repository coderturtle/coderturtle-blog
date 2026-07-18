# Session Log

---

## Session: Built the real Workshops page; fixed two other repos' broken custom domains as a precondition

**Date:** 2026-07-18 21:00

### What Changed

Closed a long-open next-action: built /workshops/ (content collection, 4 real entries, tag filter, expandable summaries) and wired /enter/ + sitewide nav to it. Found and fixed a browser-caught bug (CSS specificity defeating the hidden attribute) and ran all four workshops' copy through the real Editor Gremlin plus this project's own voice guide. Precondition: fixed two live, fully-broken custom domains (borrow-native, half-life) in their own repos before linking to them

### Decisions

See docs/decisions.md's 2026-07-18 entries (three, same day: initial build, bug fix + Editor Gremlin pass, voice-guide tightening)

### Assumptions

None new

### Risks

None new

### Next Actions

- [ ] Build a real /labs/ page (that station still reads 'still being built'); add a 5th workshops entry whenever the next workshop launches
