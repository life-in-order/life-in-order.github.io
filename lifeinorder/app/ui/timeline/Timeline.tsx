"use client";

import { useState, useEffect } from "react";
import type { Category, ChecklistItem } from "@/app/lib/definitions";
import { isDueAtAge } from "@/app/lib/utils/items";
import { getProfile, saveProfile } from "@/app/lib/utils/storage";
import CategoryColumn from "./CategoryColumn";
import AgeSelector from "./AgeSelector";

interface TimelineProps {
  categories: Category[];
  items: ChecklistItem[];
}

const ALL_AGES = Array.from({ length: 75 }, (_, i) => i + 1);
const DEFAULT_AGE = 30;

export default function Timeline({ categories, items }: TimelineProps) {
  const [userAge, setUserAge] = useState<number | null>(null);
  const [houseAge, setHouseAge] = useState<number | null>(null);
  const [selectedAge, setSelectedAge] = useState(DEFAULT_AGE);
  const [ageInput, setAgeInput] = useState("");
  const [houseAgeInput, setHouseAgeInput] = useState("");
  const [showPersonalization, setShowPersonalization] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    if (profile.userAge) {
      setUserAge(profile.userAge);
      setSelectedAge(profile.userAge);
    } else {
      setShowPersonalization(true);
    }
    if (profile.houseAge) setHouseAge(profile.houseAge);
  }, []);

  function handlePersonalizationSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedUserAge = parseInt(ageInput, 10);
    const parsedHouseAge = parseInt(houseAgeInput, 10);
    if (isNaN(parsedUserAge) || parsedUserAge < 1 || parsedUserAge > 120) return;

    const profile = {
      userAge: parsedUserAge,
      houseAge: !isNaN(parsedHouseAge) ? parsedHouseAge : undefined,
    };
    saveProfile(profile);
    setUserAge(parsedUserAge);
    setSelectedAge(parsedUserAge);
    if (!isNaN(parsedHouseAge)) setHouseAge(parsedHouseAge);
    setShowPersonalization(false);
  }

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const visibleItems = items.filter((item) => {
    const category = categoryMap.get(item.category_id);
    if (!category) return false;
    const age = category.entity_type === "house" ? houseAge : selectedAge;
    if (age === null) return false;
    return isDueAtAge(item, age);
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-8 py-6 border-b border-zinc-100">
        <h1 className="text-lg font-semibold tracking-tight text-black">Life, In Order</h1>
      </header>

      {/* Personalization banner */}
      {showPersonalization && (
        <div className="bg-zinc-50 border-b border-zinc-200 px-8 py-4">
          <p className="text-sm text-zinc-600 mb-3">
            Enter your age to personalize your timeline.
          </p>
          <form onSubmit={handlePersonalizationSubmit} className="flex flex-wrap gap-3 items-end">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-zinc-500 font-medium">Your age</span>
              <input
                type="number"
                min={1}
                max={120}
                value={ageInput}
                onChange={(e) => setAgeInput(e.target.value)}
                placeholder="e.g. 35"
                className="w-24 px-3 py-1.5 text-sm text-zinc-900 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-zinc-500 font-medium">Home age (optional)</span>
              <input
                type="number"
                min={0}
                value={houseAgeInput}
                onChange={(e) => setHouseAgeInput(e.target.value)}
                placeholder="e.g. 10"
                className="w-24 px-3 py-1.5 text-sm text-zinc-900 border border-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-black text-white rounded-md hover:bg-zinc-800 transition-colors"
            >
              Personalize
            </button>
            <button
              type="button"
              onClick={() => setShowPersonalization(false)}
              className="self-center text-sm text-zinc-400 hover:text-zinc-600"
            >
              Skip
            </button>
          </form>
        </div>
      )}

      {/* Category columns */}
      <main className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 pb-20">
        {categories.map((category) => (
          <div key={category.id} className="flex-1 px-8 py-6">
            <CategoryColumn
              category={category}
              items={visibleItems.filter((i) => i.category_id === category.id)}
            />
          </div>
        ))}
      </main>

      {/* Age selector */}
      <AgeSelector
        ages={ALL_AGES}
        selectedAge={selectedAge}
        userAge={userAge}
        onSelect={setSelectedAge}
      />
    </div>
  );
}
