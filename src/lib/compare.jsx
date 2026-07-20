// Compare selection: up to three core trusts, shared across the app via a tiny
// subscribe/store so the sticky tray and the lineup checkboxes stay in sync.
// Persisted to localStorage so a refresh keeps the selection.
import { useSyncExternalStore } from "react";

const KEY = "ta.compare";
export const MAX_COMPARE = 3;

let ids = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.slice(0, MAX_COMPARE) : [];
  } catch {
    return [];
  }
}

function emit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* ignore quota / private mode */
  }
  listeners.forEach((l) => l());
}

export function toggleCompare(id) {
  if (ids.includes(id)) ids = ids.filter((x) => x !== id);
  else if (ids.length < MAX_COMPARE) ids = [...ids, id];
  else return false; // full
  emit();
  return true;
}

export function removeCompare(id) {
  ids = ids.filter((x) => x !== id);
  emit();
}

export function clearCompare() {
  ids = [];
  emit();
}

export function useCompare() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => ids,
    () => ids // getServerSnapshot — same list; keeps SSR/smoke rendering happy
  );
}
