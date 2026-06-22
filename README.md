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

### Option B — manual

Copy `skills/payload-website-template/` into either:

- `~/.claude/skills/` (global), or
- `<your-repo>/.claude/skills/` (project-scoped)

---

## Use it

In any Claude Code session:

```
/payload-website-template
/payload-website-template design the homepage, plan first
/payload-website-template audit hero/layout separation
```

…or just say *"use the payload-website-template skill"*.

> Start a **new** Claude Code session after installing so the skill is picked up.

---

## What the skill enforces

- **Hero ≠ layout.** `page.hero → RenderHero`, `page.layout[] → RenderBlocks`, kept strictly separate.
- **CMS-first content.** Editable content lives in Payload (fields, blocks, globals, rich text, relationships, media) — not hardcoded in components.
- **Design → schema → code**, in that order, with an anti-drift traceability table from design section to Payload source to React component.
- **Typed end-to-end** from generated Payload types — no parallel hand-written interfaces, no `any` escapes.
- **Static-first rendering**, `generateStaticParams`, path-scoped revalidation, and working live/draft preview.
- **SEO + conversion** baked in: one clear H1, OG metadata, proof-led copy, no design sludge or template sameness.

It also produces structured **Claude Design handover** briefs (brand position → tokens → page anatomy → CMS mapping → acceptance criteria) and **audit reports**.

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

---

## Compatibility

- **Claude Code** (CLI, desktop app, IDE extensions) — anything that reads `~/.claude/skills`.
- Not a Claude Design / claude.ai feature. To use the same rules there, paste `skills/payload-website-template/SKILL.md` in as context.

## License

MIT © nicolaeciobota
