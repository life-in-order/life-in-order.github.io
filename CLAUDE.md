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
| Database | Supabase (managed Postgres) | — |
| Hosting | Vercel | — |

## Key Data Entities

- **User** — age, completed item IDs
- **House** — age, completed item IDs
- **Car** — age, completed item IDs
- **ChecklistTopic** — category grouping items
- **ChecklistItem** — title, description, why, criticality (Red/Yellow/Green), steps, source, entity type, target age
