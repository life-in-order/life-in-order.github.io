"use client";

import { useEffect, useRef } from "react";

interface AgeSelectorProps {
  ages: number[];
  selectedAge: number;
  userAge: number | null;
  onSelect: (age: number) => void;
}

export default function AgeSelector({ ages, selectedAge, userAge, onSelect }: AgeSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [selectedAge]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide px-6 py-3 gap-1"
      >
        {ages.map((age) => {
          const isSelected = age === selectedAge;
          const isPersonal = age === userAge;

          return (
            <button
              key={age}
              ref={isSelected ? selectedRef : null}
              onClick={() => onSelect(age)}
              className={`relative flex-shrink-0 w-9 h-9 rounded-full text-sm transition-colors ${
                isSelected
                  ? "bg-black text-white font-semibold"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              {age}
              {isPersonal && !isSelected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
