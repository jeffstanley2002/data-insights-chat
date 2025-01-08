import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseResponses(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing responses:', error);
    return [];
  }
}

export function calculatePercentage(count: number, total: number): number {
  return Math.round((count / total) * 100);
}

export function formatPercentage(count: number, total: number): string {
  const percentage = (count / total) * 100;
  return `${percentage.toFixed(1)}%`;
}

export function sortByFrequency<T>(arr: T[]): { item: T; count: number; percentage: string }[] {
  const total = arr.length;
  const counts = arr.reduce((acc, item) => {
    acc[item as string] = (acc[item as string] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .map(([item, count]) => ({
      item: item as T,
      count,
      percentage: formatPercentage(count, total)
    }))
    .sort((a, b) => b.count - a.count);
} 