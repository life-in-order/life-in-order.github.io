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
- Categories: Health, Home, Finances, Career (Car deferred to a later phase)

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

**User**
- Age
- List of completed checklist item IDs

**House**
- Age
- List of completed checklist item IDs

**Car**
- Age
- List of completed checklist item IDs

**Checklist Topic**
- Description
- List of checklist item IDs
- Entity type it applies to (user, house, car)

**Individual Checklist Item**
- ID
- Title
- Description
- Why should I do this
- Criticality (Red / Yellow / Green)
- Step-by-step instructions (ordered list)
- Source
- Time to complete
- Monetary cost (optional)
- Entity type (user, house, car)
- Age/year it should be completed

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
| Database | Supabase (managed Postgres) | Low maintenance, built-in auth ready for Phase 2 |
| Hosting | Vercel | Free tier, native Next.js support |
| Email | Brevo | Phase 2 |
| Car category | Deferred | Not in Phase 1 scope |
| Checklist data | Seed script → Supabase | No runtime Google Sheets dependency |
| Timeline browsability | Browsable by default | Personalization prompt shown prominently |
| Completion persistence | localStorage | Acceptable to lose on browser clear |

## Open Questions

- How to have enough credibility compared to a hospital or government agency?
- Free vs. paid tier — what goes behind a paywall? (Custom reminders?)
- How important is it to have a mobile surface?
- User Journeys — detailed flows not yet documented
