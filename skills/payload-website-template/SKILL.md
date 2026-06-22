---
name: payload-website-template
description: Use when designing, auditing, or implementing a high-trust marketing website using Payload CMS Website Template, Next.js App Router, top-level heroes, layout blocks, live preview, SEO, redirects, forms, and reusable design systems. Applies to Claude Code and Claude Design handovers.
when_to_use: Use for Payload/Next.js website builds, redesigns, CMS block architecture, Claude Design handovers, design-to-code implementation plans, marketing pages, SEO pages, case study pages, blog systems, portfolio sites, service websites, and conversion-focused sites.
argument-hint: "[page, feature, block, design, audit, or implementation request]"
---

# Payload Website Template Skill

You are working on a website built from, inspired by, or compatible with the Payload CMS Website Template.

Your job is to produce websites that are:

- beautiful enough to create instant trust
- editable by non-technical admins
- strongly typed end-to-end
- fast, SEO-friendly, and statically rendered where possible
- built from reusable heroes, layout blocks, content types, and design tokens
- implemented safely without schema drift, random global components, or design dilution

Do not treat this as a static Next.js brochure site.

Treat it as a CMS-driven design system.

---

## Operating mode

Before coding, classify the request:

1. **Design task**
   - Claude Design / visual direction / page redesign / moodboard / layout concept.
   - Output design tokens, page anatomy, section hierarchy, responsive behaviour, motion notes, and Payload block implications.
   - Do not output vague "modern SaaS" filler.

2. **Architecture task**
   - Payload collections, blocks, fields, routing, preview, revalidation, SEO, forms, redirects.
   - Output schema plan, frontend component map, admin editing experience, and risks.

3. **Implementation task**
   - Code changes in an existing repo.
   - Read existing file structure first.
   - Preserve current conventions.
   - Make the smallest coherent change.
   - Never hardcode what should be editable in Payload.

4. **Audit task**
   - Compare existing implementation against Payload Website Template principles.
   - Find drift, duplication, hardcoded sections, weak CMS UX, missing types, poor SEO, weak components, and design inconsistency.

If uncertain, proceed with the safest interpretation and state assumptions briefly.

---

## Non-negotiable principles

### 1. Payload is the content architecture, not an afterthought

For every page or section, ask:

- Should this be a collection field?
- Should this be a reusable block?
- Should this be a global?
- Should this be rich text?
- Should this be a relationship?
- Should this be media?
- Should this be plugin-managed?
- Should this be hardcoded structural UI only?

Do not hardcode page content unless it is structural UI text that editors should never change.

---

### 2. Hero is independent from layout content

This is mandatory.

The Hero is a top-level Page field, usually in its own `Hero` tab.

The Hero is not a layout block.

The Hero does not live inside the `layout` array.

The Hero renders before layout blocks.

The Hero has its own frontend renderer, separate from `RenderBlocks`.

Expected Page shape:

- `title`
- `slug`
- `hero`
- `layout`
- `meta`

Expected render order:

1. Header / navigation
2. Page Hero
3. Layout blocks
4. Footer

Correct frontend shape:

```tsx
<RenderHero {...page.hero} />
<RenderBlocks blocks={page.layout} />
```

Incorrect frontend shape:

```tsx
<RenderBlocks blocks={[page.hero, ...page.layout]} />
```

Do not add Hero to the layout block list unless the project has explicitly chosen a different architecture and documented that decision.

---

### 3. Use Heroes and Layout Blocks correctly

Use a CMS page model.

Top-level Page fields:

- `title`
- `slug`
- `hero`
- `layout`
- `meta`

Hero variants may include:

- high impact
- low impact
- media hero
- text-only hero
- split hero
- case study hero
- service hero
- blog/post hero

Layout blocks inside `layout` may include:

- `content`
- `mediaBlock`
- `cta`
- `archive`
- `caseStudyGrid`
- `serviceCards`
- `logoStrip`
- `testimonial`
- `stats`
- `faq`
- `formBlock`
- `banner`
- `featureGrid`
- `processSteps`
- `relatedPosts`

Each layout block must have:

- a Payload block config
- generated TypeScript type coverage
- a frontend React component
- a mapping entry in `RenderBlocks`
- sensible admin labels
- safe optional fields
- responsive behaviour
- empty-state handling

---

### 4. Design first, schema second, code third

Never jump straight into components.

For every new page or redesign:

1. Define page intent.
2. Define primary conversion action.
3. Define trust signals.
4. Define section order.
5. Define editable CMS fields.
6. Define hero model.
7. Define layout block model.
8. Define responsive states.
9. Define SEO metadata.
10. Then implement.

---

### 5. Editors must not need developers for normal content changes

Admins should be able to:

- edit hero copy
- change hero style
- change CTA labels and links
- add/remove/reorder body sections
- edit case studies
- publish blog posts
- preview draft pages
- manage redirects
- update SEO titles/descriptions/images
- manage forms
- replace media safely

If the design requires a developer for normal marketing edits, it is wrong.

---

### 6. No design sludge

Avoid:

- generic SaaS gradient soup
- random floating blobs
- meaningless dashboards
- fake metrics unless provided
- "trusted by leading brands" without proof
- overused glass effects unless explicitly requested
- over-animation
- template sameness
- walls of copy
- icons as decoration without meaning
- mobile layouts treated as afterthoughts

Design must create instant trust through hierarchy, proof, specificity, restraint, and rhythm.

---

## Claude Design handover requirements

When producing instructions for Claude Design, output:

### Brand position

- Who the site is for
- What it sells
- Why visitors should trust it quickly
- Desired emotional temperature
- What must not be implied

### Visual direction

- Layout system
- Grid
- Type scale
- Spacing rhythm
- Colour tokens
- Surface styles
- Border/radius rules
- Imagery rules
- Motion rules
- Interaction rules
- Mobile behaviour

### Page anatomy

For every page:

- route
- purpose
- primary CTA
- secondary CTA
- top-level hero requirements
- layout sections in order
- content needed
- proof points
- CMS blocks required
- responsive notes

### Component inventory

List every component Claude Design expects code to implement:

- component name
- purpose
- props/data source
- variants
- empty state
- mobile behaviour
- motion behaviour
- related Payload field or block

### CMS implications

For every design section, define whether it maps to:

- top-level Page field
- Hero field
- layout block
- global
- media
- relationship
- rich text
- hardcoded structural UI

### Acceptance criteria

Include a checklist:

- visual match
- responsive match
- hero independent from layout
- CMS editability
- no hardcoded editable content
- SEO fields
- preview works
- forms/redirects handled where relevant

---

## Payload Website Template architecture checklist

When inspecting or creating a Payload website, verify:

### Collections

Expected baseline collections:

- Pages
- Posts
- Media
- Categories or Tags where needed
- Forms if using form builder
- Redirects if using redirects plugin
- Users if admin/auth is needed

For each collection, check:

- admin labels
- tabs for clean editing
- access rules
- draft support if needed
- preview URL
- SEO fields
- slug strategy
- relationship fields
- media usage
- generated types

### Pages

Pages should usually include:

- `title`
- `slug`
- `hero`
- `layout`
- `meta`
- `_status` / drafts where enabled

`hero` is top-level.

`layout` is the reorderable body section builder.

`meta` controls SEO.

Avoid page-specific hardcoded templates unless the route truly needs custom business logic.

### Posts

Posts should usually use:

- focused rich text body
- featured image
- category/tag relationships
- author if relevant
- published date
- related posts logic
- SEO metadata

Posts should not become a chaotic page builder unless the product requires editorial layouts.

### Media

Media components must handle:

- alt text
- responsive image sizes
- optional video
- priority loading only when appropriate
- captions if needed
- empty/fallback states

### Forms

Forms should be CMS-driven where possible:

- fields map to frontend components
- `react-hook-form` handles validation/state
- confirmation message or redirect is supported
- submission storage/email behaviour is clear
- spam protection is considered

### Redirects

Redirect logic should preserve SEO and user trust:

- old path
- destination
- permanent/temporary status
- internal/external handling
- fallback handling for missing pages

---

## Rendering pipeline expectations

When implementing or auditing, follow the Payload Website Template rendering pipeline:

1. Next.js catch-all route receives the slug.
2. Server component queries Payload through the local API.
3. If the page exists, render it.
4. If not found, check redirects.
5. If no redirect, return not found.
6. Render the top-level hero through `RenderHero`.
7. Render layout blocks through `RenderBlocks`.
8. Convert Lexical rich text using the project's JSX/rich text converter.
9. Render CMS links through a shared CMS link component.
10. Render media through a shared media component.
11. Apply SEO metadata.
12. Support live preview/draft preview where configured.
13. Revalidate affected paths when content changes.

Never bypass this pipeline unless there is a documented reason.

---

## Component mapping rules

Use separate renderers for Hero and Layout.

### Hero rendering rule

Do not render Hero through `RenderBlocks`.

Use a dedicated Hero renderer:

```tsx
<RenderHero {...page.hero} />
<RenderBlocks blocks={page.layout} />
```

`RenderHero` handles hero variants such as:

- high impact
- low impact
- media hero
- text-only hero
- split hero
- case study hero
- service hero
- post hero

### Layout block rendering rule

Use a central block renderer pattern for body blocks only.

Example intent:

```tsx
const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  cta: CTABlock,
  archive: ArchiveBlock,
  formBlock: FormBlock,
}

export const RenderBlocks = ({ blocks }) => {
  if (!blocks?.length) return null

  return blocks.map((block, index) => {
    const Component = blockComponents[block.blockType]

    if (!Component) {
      return null
    }

    return <Component key={block.id || index} {...block} />
  })
}
```

Rules:

- Do not silently create random one-off section components outside the block system.
- Do not duplicate block renderers.
- Unknown block types should fail safely and be easy to detect in development.
- Components should receive typed props from generated Payload types.
- Keep block components feature-owned where possible.
- Shared components should be true primitives only.
- `RenderBlocks` must not handle Hero unless the project explicitly documents a different architecture.

---

## TypeScript and generated types

Always prefer generated Payload types.

Rules:

- Run or recommend type generation after schema changes.
- Import generated collection/block types.
- Do not invent parallel frontend interfaces if generated types exist.
- Use narrowing for `blockType`.
- Handle nullable/optional fields safely.
- Do not use `any` to escape schema mismatch.
- If frontend data and Payload schema disagree, fix the schema or mapping deliberately.

---

## Static rendering and caching rules

For public marketing pages:

- prefer static rendering where possible
- use `generateStaticParams` for known slugs
- cache/dedupe local API queries where appropriate
- avoid unnecessary dynamic rendering
- use on-demand revalidation hooks when content changes
- revalidate the specific path, not the entire site, unless necessary

For draft/live preview:

- allow dynamic preview behaviour only in preview context
- do not weaken production caching just to make preview easier

---

## Live Preview rules

Live Preview must feel useful to editors.

Check:

- Payload live preview or collection-level preview config exists
- preview URL resolves to the correct frontend route
- server-side preview uses route refresh behaviour where appropriate
- autosave/drafts are configured where needed
- preview does not leak draft content publicly
- preview works for pages and posts if both are editable

---

## Revalidation hook rules

When a page/post changes:

- revalidate the canonical path
- revalidate related archive/list pages when needed
- revalidate home if it displays the changed content
- revalidate category pages if affected
- avoid full rebuild thinking

Document exactly which paths are revalidated.

---

## SEO rules

Every public page/post should support:

- title
- description
- open graph image
- canonical where relevant
- noindex when needed
- structured content hierarchy with one clear H1
- semantic sections
- internal links
- accessible alt text

Marketing pages need:

- proof high on page
- specific service language
- local/service-area targeting where relevant
- case studies
- FAQs based on actual buyer objections
- conversion CTA repeated at sensible points

Never generate keyword stuffing.

---

## Website conversion rules

A strong website must answer, fast:

1. What do you do?
2. Who is it for?
3. Why should I trust you?
4. What proof do you have?
5. What happens if I click?
6. How do I contact/book/buy?

For production, event, agency, portfolio, and service sites, prioritize:

- hero with concrete offer
- proof strip
- client logos or named credits
- strong services overview
- case studies
- process
- equipment/capabilities where relevant
- testimonials if real
- clear contact CTA
- fast-loading pages
- human copy

Use specificity over adjectives.

Weak:
"High-quality solutions for ambitious brands."

Strong:
"Multi-camera event production, vMix streaming, showcalling, motion graphics, and technical delivery for live corporate events."

---

## Design system output format

When asked to design or redesign, output:

```md
# Design Direction

## Goal
...

## Audience
...

## Conversion action
...

## Visual principles
...

## Tokens

- Colours:
- Type:
- Spacing:
- Radius:
- Shadows:
- Motion:

## Pages

### /route

- Purpose:
- Top-level hero:
- Layout sections:
- Payload fields:
- Layout blocks:
- CTA:
- SEO angle:

## Components

| Component | Source | Variants | Notes |
| --- | --- | --- | --- |

## CMS block plan

| Block or field | Type | Fields | Frontend component | Notes |
| --- | --- | --- | --- | --- |

## Implementation phases

1. ...
2. ...
3. ...

## Acceptance checklist

- [ ] Hero is top-level and independent from layout
- [ ] Layout blocks render after Hero
- [ ] Editable content is CMS-managed
- [ ] Responsive states are defined
- [ ] SEO fields are defined
- [ ] Preview and revalidation impact is known
```

---

## Implementation plan output format

Before coding, output:

```md
# Plan

## Read first

- files/directories to inspect

## Existing patterns found

- routing:
- page collection:
- hero:
- layout blocks:
- media:
- rich text:
- SEO:
- preview:
- revalidation:

## Proposed change

- schema:
- hero:
- layout blocks:
- components:
- styles:
- routing:
- tests/checks:

## Files expected to change

- ...

## Risks

- ...

## Stop point

Await approval before editing, unless the user explicitly asked to implement immediately.
```

If the user has explicitly approved implementation, proceed without asking again.

---

## Code implementation rules

When coding:

- inspect before editing
- preserve project conventions
- avoid broad refactors
- avoid unrelated formatting churn
- do not modify generated files manually
- update generated types through the proper command
- add only necessary dependencies
- keep global UI minimal
- put feature UI near the feature/block
- avoid breaking existing content
- handle empty CMS fields gracefully
- include responsive classes/states
- check accessibility
- verify build/type/lint where available

---

## Design-to-code anti-drift rules

When implementing Claude Design output:

- create a traceability map from design sections to files
- implement tokens before components
- implement primitives before page sections
- implement CMS fields before frontend mappings
- compare final DOM/visual structure to design
- do not substitute different UI because it is easier
- document any deviation and why
- do not claim complete until checked

Required traceability table:

```md
| Design section | Payload source | React component | Status | Notes |
| --- | --- | --- | --- | --- |
| Hero | `page.hero` | `RenderHero` / hero variant | ... | Top-level field, not layout |
| Body section | `page.layout[]` | `RenderBlocks` / block component | ... | Layout block |
```

---

## Audit checklist

When auditing a Payload website, report:

```md
# Payload Website Template Audit

## Summary
...

## What is working
...

## Critical issues
...

## Hero/layout separation
...

## Design drift
...

## CMS editability gaps
...

## Payload architecture gaps
...

## Type safety issues
...

## Performance/rendering issues
...

## SEO/conversion issues
...

## Recommended repair plan

1. ...
2. ...
3. ...

## Files to inspect/change

...
```

Be blunt but useful. Do not catastrophize.

---

## Preferred project structure

Adapt to the existing repo, but prefer:

```txt
src/
  app/
    (frontend)/
      [...slug]/
      posts/[slug]/
  collections/
    Pages/
    Posts/
    Media/
  heros/
    RenderHero.tsx
    HighImpactHero.tsx
    LowImpactHero.tsx
    MediaHero.tsx
  blocks/
    Content/
    MediaBlock/
    CTA/
    FormBlock/
    Archive/
  components/
    CMSLink/
    Media/
    RichText/
  globals/
    Header/
    Footer/
  utilities/
    getPayload.ts
    queryPageBySlug.ts
    generateMeta.ts
    revalidate.ts
```

If the actual template differs, follow the repo.

---

## Strong defaults for a marketing website

Recommended pages:

- Home
- About
- Services
- Work / Case Studies
- Case Study detail
- Blog
- Blog post
- Contact
- Privacy / legal pages if needed

Recommended top-level Page fields:

- title
- slug
- hero
- layout
- meta

Recommended Hero variants:

- high impact
- low impact
- media hero
- text-only hero
- split hero
- case study hero
- service hero
- post hero

Recommended layout blocks:

- proofStrip
- logoStrip
- servicesGrid
- featuredCaseStudies
- processSteps
- testimonial
- mediaBlock
- richTextContent
- faq
- cta
- formBlock
- relatedPosts

Recommended globals:

- Header
- Footer
- Announcement bar if needed
- Site settings
- Navigation

---

## Copy quality rules

Copy must be:

- specific
- direct
- commercially useful
- human
- proof-led
- scannable
- free from procurement sludge

Avoid:

- "we are passionate about"
- "bespoke solutions"
- "seamless experiences"
- "end-to-end excellence"
- "unlock your potential"
- "elevate your brand"
- fake superlatives
- bloated paragraphs

Prefer:

- what is delivered
- who it helps
- proof
- constraints handled
- outcomes
- next step

---

## Done means

A task is not done until:

- the hero is top-level and independent from layout
- the design maps to Payload fields and blocks
- editable content is not hardcoded
- frontend components are typed
- block rendering works
- media/rich text/links are handled
- mobile states are considered
- preview/revalidation impact is known
- SEO impact is known
- acceptance checklist is satisfied
- changed files are summarized
- risks are disclosed
