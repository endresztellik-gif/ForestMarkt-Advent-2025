import Calendar from './components/Calendar'
import ChristmasMessage from './components/ChristmasMessage'
import { isChristmas } from './utils/dateUtils'

// ⚠️ ELŐNÉZET MÓD - állítsd false-ra éles használathoz!
const PREVIEW_CHRISTMAS = false

export default function App() {
  // December 25-26-án karácsonyi üzenet, egyébként a naptár
  if (PREVIEW_CHRISTMAS || isChristmas()) {
    return <ChristmasMessage />
  }

  return <Calendar />
}
