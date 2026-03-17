"use client";

const STORAGE_KEY = "lifeinorder";

interface StoredProfile {
  userAge?: number;
  houseAge?: number;
}

interface StoredData {
  profile: StoredProfile;
  completions: Record<string, string>; // itemId → ISO timestamp
}

function load(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { profile: {}, completions: {} };
    return JSON.parse(raw);
  } catch {
    return { profile: {}, completions: {} };
  }
}

function save(data: StoredData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProfile(): StoredProfile {
  return load().profile;
}

export function saveProfile(profile: StoredProfile): void {
  const data = load();
  save({ ...data, profile });
}

export function getCompletions(): Record<string, string> {
  return load().completions;
}

export function markComplete(itemId: string): void {
  const data = load();
  data.completions[itemId] = new Date().toISOString();
  save(data);
}

export function markIncomplete(itemId: string): void {
  const data = load();
  delete data.completions[itemId];
  save(data);
}
