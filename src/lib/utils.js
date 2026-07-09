import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Used by shadcn/ui- and 21st.dev-style components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
