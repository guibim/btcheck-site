import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to dd/mm/yyyy (pt-BR).
 * Accepts:
 * - "YYYY-MM-DD" (date-only)
 * - ISO datetime strings (e.g. "2026-02-22T11:16:35+00")
 */
export function formatDateBR(value: string, tz = "America/Sao_Paulo") {
  if (!value) return "";

  // Date-only: YYYY-MM-DD -> dd/mm/yyyy (no Date parsing to avoid timezone quirks)
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) {
    const [, y, mo, d] = m;
    return `${d}/${mo}/${y}`;
  }

  // ISO datetime -> format in provided timezone
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dt);
}