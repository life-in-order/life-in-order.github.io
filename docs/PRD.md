# Product Requirements Document: Life, In Order

## Executive Summary

Life does not come with a manual. People were never taught the list of things they have to do on a regular basis to maintain an organized life. **Life, In Order** provides an authoritative list of ongoing responsibilities all humans should do so they can have a solid foundation to pursue the higher aspects of life.

Life, In Order provides comprehensive, expert-vetted advice, an automated system for reminding, and motivation to help users actually complete the tasks they need.

---

## Problem Statement

Everyone goes through life vaguely aware they should be responsible and keep up-to-date on their ongoing obligations — but even if they want to, **they don't know what to do or how to do them.**

- **No centralized source**: There's no single place for understanding the full list of ongoing responsibilities for leading an organized life.
- **Forgetting**: Even if people are aware of tasks they should complete, they may forget to do so.
- **Resistance**: People don't understand why they have to go through these responsibilities, or they misjudge the criticality. Both add activation energy.

---

## Personas & Pain Points

**Health-conscious individuals** who want to stay healthy but don't know all the steps, particularly as they age.
- Reminders to pick up/refill meds
- Screenings/tests they should do over the years and every year
- Mental health sub-checklist
- Simple weight-training exercises as they age
- Reminders to use up insurance benefits

**Homeowners** who need to keep up with maintenance to avoid expensive repairs.
- When to replace appliances
- Gutter cleaning
- Upgrading the home (e.g. adding EV charging)
- Renovation planning (architects, contractors, permits, storage, temporary housing)

**Car owners** who want regular maintenance to keep their car in good condition.
- Oil changes, regular servicing, tire rotation/replacement
- Transmission fluid, cabin/engine filter, windshield wipers, brake replacement

**Career-focused individuals**
- Annual raise discussions
- Maintaining a brag doc
- Saving positive feedback, requesting peer/manager feedback
- Regular time set aside for learning

**Finance-focused individuals**
- Taxes, IRA conversion, insurance benefits
- Estate planning, setting and increasing recurring savings

---

## Phase 1: Core Product (MVP)

### First-Time User Flow
1. User lands on the page and sees the full timeline (browsable by default, no login required)
2. Prompt to enter age, house age, and car age is readily visible — entering these personalizes the timeline
3. Completion state is stored in localStorage (acceptable to lose on browser clear)

### Timeline UX
- Right-scrolling timeline for desktop
- Default view: timeline at the bottom with clickable ages
- Per category (medical, homeownership, personal finance, etc.), a summary of tasks appears side by side

### Phase 1 Scope
- Categories: Health, Home, Finances (Career and Car deferred to post-launch)
- Gender: gender-neutral combined view with callout badges on female- or male-specific items (`applicable_sex` field)

### Individual Checklist Item
Each item includes:
- Item title
- Brief description of what to do
- Why you should do this / what happens if you don't
- Criticality: Red / Yellow / Green
- Exact step-by-step instructions
- Estimated time (and monetary cost where applicable)
- **Activation energy reducers:**
  - Pre-written email templates to send to doctors/mechanics
  - Phone scripts for scheduling
  - Links to find providers/services nearby
  - "Add to calendar" buttons
- Button to mark item as completed

### Personalization
User enters their age, the age of their house, and the age of their car — the timeline is tailored to the items they need to complete.

### Data Model

#### `category`
Groups items into sections on the timeline.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `name` | text | "Health", "Home", "Finances", "Career" |
| `description` | text | |
| `entity_type` | text | `"user"` or `"house"` — whose age drives timing. Text (not enum) so adding "car" later requires no migration |
| `display_order` | int | Order shown in UI |

#### `checklist_item`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `category_id` | uuid | FK → category |
| `title` | text | |
| `subtitle` | text | One-liner summary for timeline card previews |
| `description` | text | Full description of what to do |
| `why` | text | Why / what happens if you don't |
| `criticality` | text | `"red"`, `"yellow"`, or `"green"` |
| `applicable_sex` | text | `"all"`, `"female"`, or `"male"`. Items with `"female"` or `"male"` show a callout badge in the UI. Default is `"all"`. |
| `estimated_time` | text | e.g. "30 minutes" |
| `estimated_cost` | text | Optional, e.g. "$20–$50" |
| `source` | text | URL or citation |
| `start_age` | int | Age (of entity) when this first applies |
| `end_age` | int | Nullable — if item stops applying after an age |
| `recurrence` | jsonb | See recurrence schema below |

**Recurrence JSONB schema:**
```json
{ "type": "one_time" }
{ "type": "recurring", "every_months": 12 }
{ "type": "recurring", "every_months": 6 }
{ "type": "recurring", "every_months": 120 }
{ "type": "age_range", "every_months": 12, "start_age": 40, "end_age": 75 }
```
Using months as the base unit handles everything from quarterly (3) to decadal (120) without a separate unit field. New recurrence types can be added by extending the frontend logic — no schema migration needed.

#### `item_step`
Ordered step-by-step instructions per item.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `item_id` | uuid | FK → checklist_item |
| `step_order` | int | Sort order |
| `text` | text | Instruction |
| `resource_url` | text | Nullable — link for this step |

#### `item_resource`
Activation energy reducers (email templates, phone scripts, provider links). Aspirational for Phase 1 — table is designed but may not be populated initially.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `item_id` | uuid | FK → checklist_item |
| `type` | text | `"email_template"`, `"phone_script"`, `"provider_link"`, `"calendar_event"` |
| `label` | text | Button/link label shown in UI |
| `content` | text | Template text, script, URL, or calendar data |

#### localStorage (Phase 1 — no DB)
```json
{
  "profile": {
    "userAge": 35,
    "houseAge": 8
  },
  "completions": {
    "<item-uuid>": "2025-11-01T00:00:00Z"
  }
}
```
Phase 2 migration: on first login, read localStorage and upsert into a `user_completion` table.

### Checklist Data Strategy
- Source data lives in Google Sheets (medical and home ownership timelines)
- **Import approach**: One-time seed script exports sheets → seeds Supabase DB
- Ongoing edits done via Supabase dashboard or by updating sheets and re-running the seed script
- No runtime dependency on Google Sheets

**Source sheets:**
- [Medical Timeline Sheet](https://docs.google.com/spreadsheets/u/0/d/1Yz-Sh6ZnM4_TetSUZK8DIg4HY69FU82qYLCJvnn19H4/edit)
- [Home Ownership Timeline Sheet](https://docs.google.com/spreadsheets/d/19sTg5l0i7BuYIgTxp60nSCW8_1lHMXUJG9B-Ak6pt94/edit?gid=0#gid=0)

**Reference sources:**
- https://communityhealth.mayoclinic.org/prevention-and-wellness/adult
- https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations

---

## Phase 2: Reminders & Accountability

- **Email reminders** (tool: Brevo)
  - Reminder to get the screening
  - Personalized — option to check off items directly in the email
  - Summary of items already checked off
  - Year in review — celebrating accomplishments
  - Recommended actions
- **Accountability features**
  - Share your timeline with a partner/family member
  - "Accountability buddy" system
- **"I'll do this Saturday" button**
  - Adds a concrete plan to their calendar
  - Sends prep info (what to bring, questions to ask)
  - Follows up afterward to mark complete

---

## Phase 3: Custom Items

- Individual user one-off custom checklist items

---

## Phase 4: User-Contributed Checklists

- User-contributed checklists
- User safety, monetization, creator tools
- Social media sharing
- Trustworthiness mechanisms

---

## Decisions Made

| Decision | Choice | Notes |
|----------|--------|-------|
| Phase 1 auth | Anonymous / localStorage | Supabase Auth added in Phase 2 |
| Phase 1 data source | JSON files in `app/lib/data/` | Supabase introduced in Phase 2; no cost or lock-in for Phase 1 |
| Database (Phase 2) | Supabase (managed Postgres) | Low maintenance, built-in auth, standard Postgres underneath |
| Data access layer | `app/lib/db/` functions only | Pages never import data directly; only `lib/db/` changes in Phase 2 migration |
| Hosting | Vercel | Free tier, native Next.js support |
| Email | Brevo | Phase 2 |
| Car category | Deferred post-launch | — |
| Career category | Deferred post-launch | — |
| Checklist data | CSV → seed script → JSON files | No runtime Google Sheets or Supabase dependency in Phase 1 |
| Timeline browsability | Browsable by default | Personalization prompt shown prominently |
| Completion persistence | localStorage | Acceptable to lose on browser clear |
| Gender | Gender-neutral combined view | `applicable_sex` field drives callout badges on female/male-specific items |

## Open Questions

- How to have enough credibility compared to a hospital or government agency?
- Free vs. paid tier — what goes behind a paywall? (Custom reminders?)
- How important is it to have a mobile surface?
- User Journeys — detailed flows not yet documented
