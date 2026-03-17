import type { Category, ChecklistItem } from "@/app/lib/definitions";
import ItemCard from "./ItemCard";

interface CategoryColumnProps {
  category: Category;
  items: ChecklistItem[];
}

const CRITICALITY_ORDER = { red: 0, yellow: 1, green: 2 };

export default function CategoryColumn({ category, items }: CategoryColumnProps) {
  const sorted = [...items].sort(
    (a, b) => CRITICALITY_ORDER[a.criticality] - CRITICALITY_ORDER[b.criticality]
  );

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
        {category.name}
      </h2>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-400 italic">Nothing due at this age.</p>
      ) : (
        <div>
          {sorted.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
