import type { ChecklistItem } from "@/app/lib/definitions";

export function isDueAtAge(item: ChecklistItem, age: number): boolean {
  const { recurrence, start_age, end_age } = item;

  switch (recurrence.type) {
    case "one_time":
      return age === start_age;

    case "recurring": {
      const periodYears = recurrence.every_months / 12;
      const withinEnd = end_age == null || age <= end_age;
      return age >= start_age && withinEnd && (age - start_age) % periodYears === 0;
    }

    case "age_range": {
      const periodYears = recurrence.every_months / 12;
      return (
        age >= recurrence.start_age &&
        age <= recurrence.end_age &&
        (age - recurrence.start_age) % periodYears === 0
      );
    }
  }
}
