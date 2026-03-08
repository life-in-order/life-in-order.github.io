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
