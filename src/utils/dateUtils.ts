import { addDays, isBefore, isSameDay, format } from 'date-fns'
import { hu } from 'date-fns/locale'

// ⚠️ TESZT MÓD - állítsd true-ra teszteléshez!
export const TEST_MODE = false  // Minden ablak nyitható preview módban

export const ADVENT_START = new Date(2025, 10, 30) // November 30, 2025
export const ADVENT_END = new Date(2025, 11, 24)   // December 24, 2025
export const CHRISTMAS_START = new Date(2025, 11, 25) // December 25, 2025
export const CHRISTMAS_END = new Date(2025, 11, 26)   // December 26, 2025
export const NEW_YEAR_START = new Date(2025, 11, 27)  // December 27, 2025
export const NEW_YEAR_END = new Date(2025, 11, 31)    // December 31, 2025
export const NEW_YEAR_GREETING_START = new Date(2026, 0, 1)  // January 1, 2026
export const NEW_YEAR_GREETING_END = new Date(2026, 0, 5)    // January 5, 2026

export function getDateForDay(dayNumber: number): Date {
  return addDays(ADVENT_START, dayNumber - 1)
}

export function isDateUnlocked(dayNumber: number): boolean {
  // Teszt módban minden nap nyitható
  if (TEST_MODE) return true

  const today = new Date()
  const targetDate = getDateForDay(dayNumber)
  return isBefore(targetDate, today) || isSameDay(targetDate, today)
}

export function isSunday(dayNumber: number): boolean {
  // Vasárnapok: 1 (nov 30), 8 (dec 7), 15 (dec 14), 22 (dec 21)
  return [1, 8, 15, 22].includes(dayNumber)
}

export function isChristmas(): boolean {
  const today = new Date()
  return isSameDay(today, CHRISTMAS_START) || isSameDay(today, CHRISTMAS_END)
}

export function formatDateLabel(dayNumber: number): string {
  const date = getDateForDay(dayNumber)
  // "November 30." vagy "December 14." formátum
  return format(date, 'MMMM d.', { locale: hu })
}

// ===== SZILVESZTERI NAPTÁR FÜGGVÉNYEK =====

// Szilveszteri időszak ellenőrzése (dec 27-31)
export function isNewYearPeriod(): boolean {
  const today = new Date()
  return (isSameDay(today, NEW_YEAR_START) || isBefore(NEW_YEAR_START, today)) &&
         (isSameDay(today, NEW_YEAR_END) || isBefore(today, NEW_YEAR_END))
}

// Ablak dátumának meghatározása (1-10 ablakszám → dátum)
export function getDateForNewYearWindow(windowNumber: number): Date {
  const dayOffset = Math.floor((windowNumber - 1) / 2)
  return addDays(NEW_YEAR_START, dayOffset)
}

// Ablak feloldottságának ellenőrzése
export function isNewYearWindowUnlocked(windowNumber: number): boolean {
  if (TEST_MODE) return true
  const today = new Date()
  const targetDate = getDateForNewYearWindow(windowNumber)
  return isBefore(targetDate, today) || isSameDay(targetDate, today)
}

// Ablak címkéje (pl. "December 27. - Délelőtt")
export function formatNewYearLabel(windowNumber: number): string {
  const date = getDateForNewYearWindow(windowNumber)
  const timeOfDay = (windowNumber % 2 === 1) ? 'Délelőtt' : 'Este'
  return `${format(date, 'MMMM d.', { locale: hu })} - ${timeOfDay}`
}

// Újévi köszöntő időszak ellenőrzése (jan 1-5)
export function isNewYearGreetingPeriod(): boolean {
  const today = new Date()
  return (isSameDay(today, NEW_YEAR_GREETING_START) || isBefore(NEW_YEAR_GREETING_START, today)) &&
         (isSameDay(today, NEW_YEAR_GREETING_END) || isBefore(today, NEW_YEAR_GREETING_END))
}
