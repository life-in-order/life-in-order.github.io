/**
 * Seed script: converts CSV source data → JSON files in lifeinorder/app/lib/data/
 *
 * Run from repo root:
 *   npx tsx scripts/seed.ts
 *
 * In Phase 2, replace this script with one that inserts into Supabase
 * using the same data shape.
 */

import * as fs from "fs";
import * as path from "path";

// ─── Types (mirrors app/lib/definitions.ts) ──────────────────────────────────

type Recurrence =
  | { type: "one_time" }
  | { type: "recurring"; every_months: number }
  | { type: "age_range"; every_months: number; start_age: number; end_age: number };

type ApplicableSex = "all" | "female" | "male";

interface Category {
  id: string;
  name: string;
  description: string;
  entity_type: "user" | "house";
  display_order: number;
}

interface ChecklistItem {
  id: string;
  category_id: string;
  title: string;
  subtitle: string;
  description: string;
  why: string;
  criticality: "red" | "yellow" | "green";
  applicable_sex: ApplicableSex;
  estimated_time: string;
  estimated_cost: string;
  source: string;
  start_age: number;
  end_age: number | null;
  recurrence: Recurrence;
  steps: { step_order: number; text: string; resource_url?: string }[];
}

// ─── CSV Parsing ──────────────────────────────────────────────────────────────

function parseCSV(filePath: string): Map<number, Set<string>> {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n").slice(1); // skip header row
  const result = new Map<number, Set<string>>();

  for (const line of lines) {
    const cols = line.split(",").map((c) => c.trim().replace(/\s+/g, " "));
    const age = parseInt(cols[0], 10);
    if (isNaN(age)) continue;

    const items = cols.slice(1).filter((c) => c.length > 0);
    if (items.length > 0) {
      result.set(age, new Set(items));
    }
  }

  return result;
}

// ─── Recurrence Inference ─────────────────────────────────────────────────────

function inferRecurrence(ages: number[]): Recurrence {
  if (ages.length === 1) return { type: "one_time" };

  const sorted = [...ages].sort((a, b) => a - b);
  const gaps = sorted.slice(1).map((age, i) => age - sorted[i]);
  const minGap = Math.min(...gaps);
  const maxGap = Math.max(...gaps);

  // All gaps equal → clean recurrence
  if (minGap === maxGap) {
    return { type: "recurring", every_months: minGap * 12 };
  }

  // Mostly annual with occasional skips → treat as annual
  if (minGap === 1 && maxGap <= 2) {
    return { type: "recurring", every_months: 12 };
  }

  // Items that span a bounded age range at a consistent frequency
  const modalGap = mode(gaps);
  const start = sorted[0];
  const end = sorted[sorted.length - 1];

  return {
    type: "age_range",
    every_months: modalGap * 12,
    start_age: start,
    end_age: end,
  };
}

function mode(arr: number[]): number {
  const freq = new Map<number, number>();
  for (const n of arr) freq.set(n, (freq.get(n) ?? 0) + 1);
  return [...freq.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

// ─── ID Generation ────────────────────────────────────────────────────────────

function toId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Build Items from CSV data ────────────────────────────────────────────────

interface ItemAgeMap {
  [title: string]: number[];
}

function buildItemAgeMap(csvData: Map<number, Set<string>>): ItemAgeMap {
  const map: ItemAgeMap = {};
  for (const [age, items] of csvData) {
    for (const item of items) {
      if (!map[item]) map[item] = [];
      map[item].push(age);
    }
  }
  return map;
}

function buildItems(
  itemAgeMap: ItemAgeMap,
  categoryId: string,
  applicableSex: ApplicableSex
): ChecklistItem[] {
  return Object.entries(itemAgeMap).map(([title, ages]) => {
    const sorted = [...ages].sort((a, b) => a - b);
    const recurrence = inferRecurrence(sorted);

    return {
      id: toId(title),
      category_id: categoryId,
      title: title.trim(),
      subtitle: "", // TODO: fill in
      description: "", // TODO: fill in
      why: "", // TODO: fill in
      criticality: "yellow", // TODO: review per item
      applicable_sex: applicableSex,
      estimated_time: "",
      estimated_cost: "",
      source: "", // TODO: fill in
      start_age: sorted[0],
      end_age: sorted.length > 1 ? sorted[sorted.length - 1] : null,
      recurrence,
      steps: [],
    };
  });
}

// ─── Merge male + female medical data ────────────────────────────────────────

function mergeMedical(
  femaleData: Map<number, Set<string>>,
  maleData: Map<number, Set<string>>
): ChecklistItem[] {
  const femaleMap = buildItemAgeMap(femaleData);
  const maleMap = buildItemAgeMap(maleData);

  const allTitles = new Set([
    ...Object.keys(femaleMap),
    ...Object.keys(maleMap),
  ]);

  const items: ChecklistItem[] = [];

  for (const title of allTitles) {
    const inFemale = !!femaleMap[title];
    const inMale = !!maleMap[title];
    const applicableSex: ApplicableSex = inFemale && inMale ? "all" : inFemale ? "female" : "male";
    const ages = applicableSex === "all"
      ? [...new Set([...(femaleMap[title] ?? []), ...(maleMap[title] ?? [])])]
      : (femaleMap[title] ?? maleMap[title]);

    const sorted = [...ages].sort((a, b) => a - b);
    const recurrence = inferRecurrence(sorted);

    items.push({
      id: toId(title),
      category_id: "health",
      title: title.trim(),
      subtitle: "",
      description: "",
      why: "",
      criticality: "yellow",
      applicable_sex: applicableSex,
      estimated_time: "",
      estimated_cost: "",
      source: "",
      start_age: sorted[0],
      end_age: sorted.length > 1 ? sorted[sorted.length - 1] : null,
      recurrence,
      steps: [],
    });
  }

  return items;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "lifeinorder/app/lib/data");

const categories: Category[] = [
  {
    id: "health",
    name: "Health",
    description: "Medical screenings, vaccines, and preventive care.",
    entity_type: "user",
    display_order: 1,
  },
  {
    id: "home",
    name: "Home",
    description: "Maintenance and upkeep to protect your home investment.",
    entity_type: "house",
    display_order: 2,
  },
  {
    id: "finances",
    name: "Finances",
    description: "Tax, savings, insurance, and estate planning milestones.",
    entity_type: "user",
    display_order: 3,
  },
];

// Parse CSVs
const femaleData = parseCSV(path.join(ROOT, "Medical Timeline Sheet - Female.csv"));
const maleData = parseCSV(path.join(ROOT, "Medical Timeline Sheet - Male.csv"));
const homeData = parseCSV(path.join(ROOT, "Home Ownership Timeline.csv"));
const financeData = parseCSV(path.join(ROOT, "Personal Finance Timeline.csv"));

// Build items
const healthItems = mergeMedical(femaleData, maleData);
const homeItems = buildItems(buildItemAgeMap(homeData), "home", "all");
const financeItems = buildItems(buildItemAgeMap(financeData), "finances", "all");

const allItems = [...healthItems, ...homeItems, ...financeItems];

// Write output
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUTPUT_DIR, "categories.json"),
  JSON.stringify(categories, null, 2)
);
fs.writeFileSync(
  path.join(OUTPUT_DIR, "items.json"),
  JSON.stringify(allItems, null, 2)
);

console.log(`✓ categories.json — ${categories.length} categories`);
console.log(`✓ items.json — ${allItems.length} items`);
console.log(`  Health: ${healthItems.length}`);
console.log(`  Home:   ${homeItems.length}`);
console.log(`  Finance: ${financeItems.length}`);
