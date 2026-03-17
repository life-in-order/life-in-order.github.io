import { getCategories } from "@/app/lib/db/categories";
import { getItems } from "@/app/lib/db/items";
import Timeline from "@/app/ui/timeline/Timeline";

export default async function Home() {
  const [categories, items] = await Promise.all([getCategories(), getItems()]);
  return <Timeline categories={categories} items={items} />;
}
