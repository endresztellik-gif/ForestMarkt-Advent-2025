import Calendar from './components/Calendar'
import ChristmasMessage from './components/ChristmasMessage'
import NewYearCalendar from './components/NewYearCalendar'
import NewYearGreeting from './components/NewYearGreeting'
import { isChristmas, isNewYearPeriod, isNewYearGreetingPeriod } from './utils/dateUtils'

// ⚠️ ELŐNÉZET MÓD - állítsd false-ra éles használathoz!
const PREVIEW_CHRISTMAS = false
const PREVIEW_NEW_YEAR = false
const PREVIEW_NEW_YEAR_GREETING = false

export default function App() {
  // ⚠️ PREVIEW módok MINDIG prioritást kapnak (teszteléshez)

  // PREVIEW: Újévi köszöntő
  if (PREVIEW_NEW_YEAR_GREETING) {
    return <NewYearGreeting />
  }

  // PREVIEW: Szilveszteri naptár
  if (PREVIEW_NEW_YEAR) {
    return <NewYearCalendar />
  }

  // PREVIEW: Karácsonyi üzenet
  if (PREVIEW_CHRISTMAS) {
    return <ChristmasMessage />
  }

  // Éles prioritás: Karácsony > Újévi köszöntő > Szilveszter > Advent

  // December 25-26-án karácsonyi üzenet
  if (isChristmas()) {
    return <ChristmasMessage />
  }

  // Január 1-5-én újévi köszöntő
  if (isNewYearGreetingPeriod()) {
    return <NewYearGreeting />
  }

  // December 27-31-én szilveszteri naptár
  if (isNewYearPeriod()) {
    return <NewYearCalendar />
  }

  // November 30 - December 24-én adventi naptár
  return <Calendar />
}
