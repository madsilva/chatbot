import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Shadcn helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
