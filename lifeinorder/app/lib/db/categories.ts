/**
 * Data access layer — categories.
 *
 * Phase 1: reads from local JSON files.
 * Phase 2: replace the import and function bodies with Supabase queries.
 *          The exported function signatures stay identical.
 */

import type { Category } from "@/app/lib/definitions";
import categoriesData from "@/app/lib/data/categories.json";

const categories = categoriesData as Category[];

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  return categories.find((c) => c.id === id) ?? null;
}
