# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Life, In Order** is a web app that provides an authoritative, expert-vetted list of ongoing life responsibilities humans should complete regularly, along with reminders and motivation to complete them. The Next.js app lives in the `lifeinorder/` subdirectory.

## Commands

All commands should be run from within the `lifeinorder/` directory:

```bash
cd lifeinorder

npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
npm run lint:fix  # Run ESLint with auto-fix
```

## Architecture

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 (imported via `@import "tailwindcss"` in `globals.css`) with Geist fonts
- **Path alias**: `@/*` maps to `lifeinorder/*`

### App Router structure

Pages and layouts live under `lifeinorder/app/`:
- `layout.tsx` — root layout with font setup and global metadata
- `page.tsx` — home page
- `globals.css` — global styles and Tailwind import

New routes are added as directories under `app/` following Next.js App Router conventions (e.g., `app/tasks/page.tsx`).

## Product Vision

See `docs/PRD.md` for the full PRD. Summary:

**Life, In Order** is a timeline-based life responsibility tracker. Users enter their age plus the age of their house and car, and get a personalized timeline of ongoing responsibilities across health, home, car, finances, and career — each with expert-vetted step-by-step guidance and activation-energy reducers (email templates, phone scripts, provider links, calendar buttons).

### Build Phases
1. **Phase 1 (MVP)**: Timeline UX + curated checklist items + personalization
2. **Phase 2**: Email reminders (Brevo) + accountability features + calendar integration
3. **Phase 3**: Custom user-added items
4. **Phase 4**: User-contributed checklists + social features

## Third-Party Services

| Service | Tool | Notes |
|---------|------|-------|
| Email reminders | Brevo | Phase 2 |
| Calendar | Google Calendar / "Add to calendar" links | Phase 1/2 |
| Auth | Anonymous (localStorage) in Phase 1; Supabase Auth in Phase 2 | — |
| Database | Supabase (managed Postgres) | Low maintenance, built-in auth for Phase 2 |
| Hosting | Vercel | Free tier, native Next.js support |
| Analytics | Umami | Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` env var to activate |

## Architecture Decisions

- **Data fetching**: Static generation (SSG) — checklist content changes rarely, a redeploy on content update is acceptable
- **Routing**: Single page with all categories together for now. Individual category routes (`/health`, `/home`, etc.) are planned but not yet built — leave architectural space for them
- **Mobile**: Graceful degradation required from day one
- **Data source (Phase 1)**: JSON files in `app/lib/data/`. Supabase introduced in Phase 2.
- **Data access layer**: All data fetching goes through `app/lib/db/` — pages and components never import from `app/lib/data/` or Supabase directly. This is the only file that changes when migrating to Supabase in Phase 2.
  - `app/lib/db/categories.ts` → `getCategories()`
  - `app/lib/db/items.ts` → `getItems()`, `getItemsByCategory()`, `getItemsByAge()`
- **Seed script**: Converts CSVs → `app/lib/data/` JSON files (not Supabase in Phase 1)

## Design

Wireframe (`main_page.pdf`, gitignored): Three-column layout — Medical Summary, Personal Finance Summary, Home Ownership Summary — each showing a checklist of items. A horizontal scrolling age timeline sits at the bottom (e.g. 45, 50, 55, 65). Clicking an age on the timeline updates the items shown above.

## Source Data

CSVs are gitignored (local use only, fed into seed script):
- `Medical Timeline Sheet - Female.csv`
- `Medical Timeline Sheet - Male.csv`
- `Home Ownership Timeline.csv`
- `Personal Finance Timeline.csv`

**Note**: Medical data has male/female variants — gender will need to be a personalization input (not in original PRD scope, to be confirmed).

## Key Data Entities

- **User** — age, completed item IDs
- **House** — age, completed item IDs
- **Car** — age, completed item IDs
- **ChecklistTopic** — category grouping items
- **ChecklistItem** — title, description, why, criticality (Red/Yellow/Green), steps, source, entity type, target age
