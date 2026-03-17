/**
 * Data access layer — checklist items.
 *
 * Phase 1: reads from local JSON files.
 * Phase 2: replace the import and function bodies with Supabase queries.
 *          The exported function signatures stay identical.
 */

import type { Category, ChecklistItem } from "@/app/lib/definitions";
import { isDueAtAge } from "@/app/lib/utils/items";
import itemsData from "@/app/lib/data/items.json";
import { getCategories } from "@/app/lib/db/categories";

const items = itemsData as ChecklistItem[];

export async function getItems(): Promise<ChecklistItem[]> {
  return items;
}

export async function getItemsByCategory(categoryId: string): Promise<ChecklistItem[]> {
  return items.filter((item) => item.category_id === categoryId);
}

export async function getItemById(id: string): Promise<ChecklistItem | null> {
  return items.find((item) => item.id === id) ?? null;
}

/**
 * Returns all items that are due at the given ages.
 * Uses category entity_type to determine whether to apply userAge or houseAge.
 * Items in a house category with no houseAge provided are omitted.
 */
export async function getItemsForAge(
  userAge: number,
  houseAge?: number
): Promise<ChecklistItem[]> {
  const categories = await getCategories();
  const categoryMap = new Map<string, Category>(categories.map((c) => [c.id, c]));

  return items.filter((item) => {
    const category = categoryMap.get(item.category_id);
    if (!category) return false;

    const age = category.entity_type === "house" ? houseAge : userAge;
    if (age === undefined) return false;

    return isDueAtAge(item, age);
  });
}

