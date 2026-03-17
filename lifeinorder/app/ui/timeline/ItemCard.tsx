"use client";

import { useState, useEffect } from "react";
import type { ChecklistItem } from "@/app/lib/definitions";
import { markComplete, markIncomplete, getCompletions } from "@/app/lib/utils/storage";

interface ItemCardProps {
  item: ChecklistItem;
}

const CRITICALITY_BADGE = {
  red:    "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
  green:  "bg-green-100 text-green-700",
};

const CRITICALITY_LABEL = {
  red:    "High",
  yellow: "Mid",
  green:  "Low",
};

const SEX_LABELS = {
  female: "F",
  male:   "M",
};

export default function ItemCard({ item }: ItemCardProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const completions = getCompletions();
    setCompleted(!!completions[item.id]);
  }, [item.id]);

  function toggle() {
    if (completed) {
      markIncomplete(item.id);
    } else {
      markComplete(item.id);
    }
    setCompleted(!completed);
  }

  return (
    // TODO: replace outer div with a button/link when expanded detail view is built
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-0">
      <button
        onClick={toggle}
        aria-label={completed ? "Mark incomplete" : "Mark complete"}
        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-colors ${
          completed
            ? "bg-black border-black"
            : "border-zinc-300 hover:border-zinc-500"
        }`}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`flex-shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded ${CRITICALITY_BADGE[item.criticality]}`}>
            {CRITICALITY_LABEL[item.criticality]}
          </span>
          <span className={`text-sm font-medium leading-snug ${completed ? "line-through text-zinc-400" : "text-zinc-900"}`}>
            {item.title}
          </span>
          {item.applicable_sex !== "all" && (
            <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 font-medium">
              {SEX_LABELS[item.applicable_sex]}
            </span>
          )}
        </div>
        {item.subtitle && (
          <p className="mt-0.5 text-xs text-zinc-500 leading-snug">{item.subtitle}</p>
        )}
      </div>
    </div>
  );
}
