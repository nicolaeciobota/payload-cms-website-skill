# payload-cms-website-skill

A [Claude Code](https://claude.com/claude-code) skill for building **high-trust Payload CMS Website Template** marketing sites with Next.js App Router.

Its one non-negotiable rule, enforced everywhere:

> **`hero` is a top-level Page field, rendered by `RenderHero` *before* `layout`.**
> Layout blocks live in `page.layout[]` and render through `RenderBlocks`. The two are **separate** — hero never goes into the layout array.

Use it when designing, auditing, or implementing Payload Website Template sites — marketing pages, case studies, blogs, portfolios, service sites, and Claude Design handovers.

---

## Install

### Option A — npx, straight from GitHub (no npm account needed)

```bash
# Global — available in every project (~/.claude/skills)
npx github:nicolaeciobota/payload-cms-website-skill

# Project-scoped — only this repo (./.claude/skills)
npx github:nicolaeciobota/payload-cms-website-skill --project
```

That's it. The installer is a zero-dependency Node script — it just copies the skill into your Claude Code skills directory.

| Flag | Effect |
| --- | --- |
| *(none)* | Install globally into `~/.claude/skills` |
| `--project` / `--local` | Install into `./.claude/skills` (current repo only) |
| `--force` | Overwrite an existing install silently |
| `--help` / `-h` | Show usage |

### Option B — manual

Copy `skills/payload-website-template/` into either `~/.claude/skills/` (global) or `<your-repo>/.claude/skills/` (project-scoped).

> After installing, **start a new Claude Code session** so the skill is picked up.

---

## How to use

### 1. Invoke it

Three ways, in any Claude Code session (CLI, desktop, or IDE extension):

```
# a) Slash command — most explicit
/payload-website-template

# b) Slash command with an inline request
/payload-website-template design the homepage, plan first

# c) Plain language — just name it
use the payload-website-template skill — we're redesigning /services
```

Invoking loads the full playbook into context **before** Claude designs or writes code, so the rules govern the whole turn. For anything important, invoke explicitly at the start of the session rather than relying on auto-trigger.

### 2. Pick the mode (the skill auto-detects, but say it to be safe)

The skill operates in four modes. Lead your prompt with the one you want:

| Mode | Use it for | Example prompt |
| --- | --- | --- |
| **Design** | Visual direction, page anatomy, tokens, redesigns, Claude Design briefs | `/payload-website-template design a homepage for a live-event production studio. Plan first.` |
| **Architecture** | Collections, blocks, fields, routing, preview, revalidation, SEO, forms | `/payload-website-template plan the Payload schema for a Case Studies collection with a case-study hero and a caseStudyGrid block.` |
| **Implementation** | Building it in an existing repo, the smallest coherent change | `/payload-website-template implement the CTA layout block — config, type, component, and the RenderBlocks mapping.` |
| **Audit** | Reviewing an existing build against the template's principles | `/payload-website-template audit this repo for hero/layout separation, design drift, and CMS editability gaps.` |

### 3. Recommended session opener

For a clean, rules-first session, paste this first:

```
Use the payload-website-template skill. We are working on a Payload Website Template site.
Plan first. Hero is top-level (page.hero -> RenderHero); layout blocks are separate
(page.layout[] -> RenderBlocks). Do not hardcode editable content.
```

### 4. A typical end-to-end flow

```
1. /payload-website-template design the /services page, plan first
      -> returns a design brief: intent, tokens, page anatomy, section order,
         and a CMS block plan (which sections are hero vs layout blocks)

2. (optional) hand the brief to Claude Design to generate visuals

3. /payload-website-template implement the approved /services design
      -> builds Payload blocks + typed components + RenderBlocks mappings,
         with a traceability table (design section -> Payload source -> component)

4. /payload-website-template audit the /services implementation
      -> flags hero/layout violations, hardcoded content, type/SEO gaps
```

### 5. Using it with Claude Design

The skill has a dedicated **Claude Design handover** mode. Ask for it:

```
/payload-website-template produce a Claude Design handover brief for the homepage
```

You get a structured brief (brand position → tokens → page anatomy → CMS mapping → acceptance criteria) that you paste into a Claude Design session. The skill doesn't *run* inside Claude Design — it produces Claude Design's input. To carry the rules into that surface, paste `skills/payload-website-template/SKILL.md` in as context.

---

## What the skill enforces

- **Hero ≠ layout.** `page.hero → RenderHero`, `page.layout[] → RenderBlocks`, kept strictly separate.
- **CMS-first content.** Editable content lives in Payload (fields, blocks, globals, rich text, relationships, media) — not hardcoded in components.
- **Design → schema → code**, in that order, with an anti-drift traceability table from design section to Payload source to React component.
- **Typed end-to-end** from generated Payload types — no parallel hand-written interfaces, no `any` escapes.
- **Static-first rendering**, `generateStaticParams`, path-scoped revalidation, and working live/draft preview.
- **SEO + conversion** baked in: one clear H1, OG metadata, proof-led copy, no design sludge or template sameness.

It also produces structured **audit reports** and **Claude Design handover** briefs.

---

## Update

Re-run the same command — it overwrites the installed copy in place:

```bash
npx github:nicolaeciobota/payload-cms-website-skill
```

## Uninstall

```bash
rm -rf ~/.claude/skills/payload-website-template          # global
rm -rf ./.claude/skills/payload-website-template          # project
```

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `/payload-website-template` not found | Start a **new** Claude Code session — skills load at startup. |
| Installed but not triggering | Invoke it explicitly (slash command or "use the … skill") instead of relying on auto-detect. |
| Wrong scope | Global lives in `~/.claude/skills`; project in `./.claude/skills`. Re-run with/without `--project`. |
| `npx` cached an old version | `npx --yes github:nicolaeciobota/payload-cms-website-skill` (or clear `~/.npm/_npx`). |

---

## Compatibility

- **Claude Code** (CLI, desktop app, IDE extensions) — anything that reads `~/.claude/skills`.
- Not a Claude Design / claude.ai feature. To use the same rules there, paste `skills/payload-website-template/SKILL.md` in as context.

## License

MIT © nicolaeciobota
