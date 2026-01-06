import { formatISO, isFuture, isToday } from 'date-fns';

export function toISODateString(date: Date): string {
  return formatISO(date);
}

export function isTodayDate(date: Date): boolean {
  return isToday(date);
}

export function getWeekdayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function isFutureDate(date: Date): boolean {
  return isFuture(date);
}
