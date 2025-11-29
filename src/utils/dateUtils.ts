import { addDays, isBefore, isSameDay, format } from 'date-fns'
import { hu } from 'date-fns/locale'

// ⚠️ TESZT MÓD - állítsd true-ra teszteléshez!
export const TEST_MODE = false

export const ADVENT_START = new Date(2025, 10, 30) // November 30, 2025
export const ADVENT_END = new Date(2025, 11, 24)   // December 24, 2025
export const CHRISTMAS_START = new Date(2025, 11, 25) // December 25, 2025
export const CHRISTMAS_END = new Date(2025, 11, 26)   // December 26, 2025

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
