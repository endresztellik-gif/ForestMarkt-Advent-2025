import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface DayWindowProps {
  dayNumber: number
  isClickable: boolean
  isSunday: boolean
  dateLabel: string
  onOpen: () => void
}

// Kártya adatok: szín, ikon, szám pozíció
interface CardStyle {
  bg: string
  numberPos: 'topLeft' | 'topRight' | 'center'
  icon: ReactNode
}

// Karácsonyi ikonok - színes, jól látható
const Icons = {
  // 1. Narancssárga gömb dísz
  ornamentOrange: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <defs>
        <linearGradient id="ornOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4A460"/>
          <stop offset="100%" stopColor="#D2691E"/>
        </linearGradient>
      </defs>
      <rect x="42" y="8" width="16" height="10" rx="2" fill="#C4A35A"/>
      <ellipse cx="50" cy="8" rx="10" ry="5" fill="#C4A35A"/>
      <circle cx="50" cy="55" r="35" fill="url(#ornOrange)"/>
      <path d="M25 50 Q50 35 75 50" stroke="#CD853F" strokeWidth="4" fill="none"/>
      <path d="M30 65 Q50 80 70 65" stroke="#CD853F" strokeWidth="4" fill="none"/>
      <ellipse cx="38" cy="45" rx="8" ry="12" fill="white" fillOpacity="0.3"/>
    </svg>
  ),

  // 2. Fehér hópelyhek
  snowflakes: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <g fill="white">
        <g transform="translate(25, 30) scale(0.5)">
          <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="4"/>
          <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="4"/>
          <line x1="8" y1="8" x2="52" y2="52" stroke="white" strokeWidth="3"/>
          <line x1="52" y1="8" x2="8" y2="52" stroke="white" strokeWidth="3"/>
        </g>
        <g transform="translate(60, 55) scale(0.35)">
          <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="4"/>
          <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="4"/>
          <line x1="8" y1="8" x2="52" y2="52" stroke="white" strokeWidth="3"/>
          <line x1="52" y1="8" x2="8" y2="52" stroke="white" strokeWidth="3"/>
        </g>
      </g>
    </svg>
  ),

  // 3. Kék fenyőfák
  trees: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <polygon points="35,75 20,75 35,50 25,50 35,25 45,25 55,50 45,50 60,75 45,75" fill="#5F9EA0"/>
      <polygon points="60,80 50,80 60,60 52,60 60,40 68,40 76,60 68,60 78,80 68,80" fill="#87CEEB" fillOpacity="0.7"/>
      <rect x="33" y="75" width="8" height="10" fill="#8B7355"/>
      <rect x="58" y="80" width="6" height="8" fill="#8B7355"/>
    </svg>
  ),

  // 4. Mikulás sapka
  santaHat: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <path d="M20 75 Q50 25 80 75" fill="#DC3545"/>
      <ellipse cx="50" cy="75" rx="35" ry="10" fill="white"/>
      <circle cx="75" cy="30" r="10" fill="white"/>
    </svg>
  ),

  // 5. Hópehely (nagy)
  snowflakeBig: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <g stroke="white" strokeWidth="3" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="10" y1="50" x2="90" y2="50"/>
        <line x1="22" y1="22" x2="78" y2="78"/>
        <line x1="78" y1="22" x2="22" y2="78"/>
        <line x1="50" y1="10" x2="40" y2="20"/><line x1="50" y1="10" x2="60" y2="20"/>
        <line x1="50" y1="90" x2="40" y2="80"/><line x1="50" y1="90" x2="60" y2="80"/>
        <line x1="10" y1="50" x2="20" y2="40"/><line x1="10" y1="50" x2="20" y2="60"/>
        <line x1="90" y1="50" x2="80" y2="40"/><line x1="90" y1="50" x2="80" y2="60"/>
      </g>
      <circle cx="50" cy="50" r="6" fill="white"/>
    </svg>
  ),

  // 6. Ajándékok
  gifts: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      {/* Kis ajándék */}
      <rect x="15" y="45" width="30" height="35" rx="2" fill="#5DADE2"/>
      <rect x="15" y="40" width="30" height="8" rx="2" fill="#3498DB"/>
      <rect x="27" y="40" width="6" height="40" fill="#DC3545"/>
      <ellipse cx="25" cy="38" rx="6" ry="4" fill="#DC3545"/>
      <ellipse cx="35" cy="38" rx="6" ry="4" fill="#DC3545"/>
      {/* Nagy ajándék */}
      <rect x="50" y="30" width="35" height="50" rx="2" fill="#F1948A"/>
      <rect x="50" y="23" width="35" height="10" rx="2" fill="#E74C3C"/>
      <rect x="64" y="23" width="7" height="57" fill="#2ECC71"/>
      <ellipse cx="60" cy="20" rx="8" ry="5" fill="#2ECC71"/>
      <ellipse cx="75" cy="20" rx="8" ry="5" fill="#2ECC71"/>
    </svg>
  ),

  // 7. Zokni + hópelyhek
  stocking: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <path d="M35 15 L35 55 Q35 75 55 80 L75 90 Q85 92 85 80 L85 70 Q85 60 75 55 L65 55 L65 15 Z" fill="#DC3545"/>
      <rect x="33" y="12" width="34" height="12" rx="3" fill="white"/>
      <circle cx="25" cy="35" r="4" fill="white" fillOpacity="0.6"/>
      <circle cx="80" cy="25" r="3" fill="white" fillOpacity="0.6"/>
    </svg>
  ),

  // 8. Forró csokoládé/bögre
  mug: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <rect x="25" y="35" width="40" height="45" rx="5" fill="#DC3545"/>
      <path d="M65 45 Q80 45 80 60 Q80 75 65 75" stroke="#DC3545" strokeWidth="6" fill="none"/>
      <ellipse cx="45" cy="35" rx="20" ry="5" fill="#B22222"/>
      {/* Gőz */}
      <path d="M35 25 Q38 15 35 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M45 28 Q48 18 45 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M55 25 Q58 15 55 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // 9. Kesztyűk
  mittens: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-1/2">
      <path d="M20 40 L20 80 Q20 90 30 90 L45 90 Q55 90 55 80 L55 50 L65 35 Q70 30 65 25 Q60 20 55 25 L55 40 L55 40 Q55 30 45 30 L30 30 Q20 30 20 40" fill="#E74C3C"/>
      <rect x="18" y="30" width="40" height="12" rx="3" fill="white"/>
      <path d="M60 60 L80 60 L80 90 Q80 95 75 95 L65 95 Q60 95 60 90 Z" fill="#E74C3C"/>
      <ellipse cx="65" cy="45" rx="15" ry="20" fill="#E74C3C"/>
      <rect x="58" y="55" width="25" height="8" rx="2" fill="white"/>
    </svg>
  ),

  // 10. Hóember
  snowman: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <circle cx="50" cy="75" r="22" fill="white"/>
      <circle cx="50" cy="45" r="16" fill="white"/>
      <circle cx="50" cy="22" r="12" fill="white"/>
      {/* Kalap */}
      <rect x="38" y="5" width="24" height="14" rx="2" fill="#2C3E50"/>
      <rect x="32" y="16" width="36" height="6" fill="#2C3E50"/>
      {/* Arc */}
      <circle cx="45" cy="20" r="2" fill="#2C3E50"/>
      <circle cx="55" cy="20" r="2" fill="#2C3E50"/>
      <polygon points="50,24 53,30 47,30" fill="orange"/>
      {/* Sál */}
      <rect x="34" y="32" width="32" height="6" fill="#DC3545"/>
      <rect x="55" y="32" width="6" height="18" fill="#DC3545"/>
      {/* Gombok */}
      <circle cx="50" cy="50" r="2.5" fill="#2C3E50"/>
      <circle cx="50" cy="60" r="2.5" fill="#2C3E50"/>
    </svg>
  ),

  // 11. Mézeskalács
  gingerbread: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <circle cx="50" cy="25" r="18" fill="#D2691E"/>
      <ellipse cx="50" cy="55" rx="15" ry="20" fill="#D2691E"/>
      <ellipse cx="25" cy="50" rx="12" ry="8" fill="#D2691E"/>
      <ellipse cx="75" cy="50" rx="12" ry="8" fill="#D2691E"/>
      <ellipse cx="38" cy="85" rx="8" ry="15" fill="#D2691E"/>
      <ellipse cx="62" cy="85" rx="8" ry="15" fill="#D2691E"/>
      {/* Díszítés */}
      <circle cx="44" cy="22" r="3" fill="white"/>
      <circle cx="56" cy="22" r="3" fill="white"/>
      <path d="M44 32 Q50 38 56 32" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="50" cy="48" r="3" fill="#DC3545"/>
      <circle cx="50" cy="60" r="3" fill="#DC3545"/>
    </svg>
  ),

  // 12. Cukorpálca
  candyCane: (
    <svg viewBox="0 0 100 100" className="w-2/5 h-3/5">
      <defs>
        <pattern id="candyStripe" patternUnits="userSpaceOnUse" width="12" height="12" patternTransform="rotate(45)">
          <rect width="6" height="12" fill="#DC3545"/>
          <rect x="6" width="6" height="12" fill="white"/>
        </pattern>
      </defs>
      <path d="M55 95 L55 35 Q55 15 40 15 Q25 15 25 30"
            stroke="url(#candyStripe)" strokeWidth="14" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // 13. Gömbök (rózsaszín)
  ornamentsPink: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <line x1="30" y1="5" x2="30" y2="25" stroke="#C4A35A" strokeWidth="2"/>
      <line x1="55" y1="10" x2="55" y2="35" stroke="#C4A35A" strokeWidth="2"/>
      <line x1="75" y1="5" x2="75" y2="30" stroke="#C4A35A" strokeWidth="2"/>
      <circle cx="30" cy="45" r="18" fill="#F5B7B1"/>
      <circle cx="55" cy="55" r="16" fill="#FADBD8"/>
      <circle cx="75" cy="48" r="14" fill="#D7BDE2"/>
      <ellipse cx="24" cy="40" rx="4" ry="6" fill="white" fillOpacity="0.4"/>
      <ellipse cx="50" cy="50" rx="3" ry="5" fill="white" fillOpacity="0.4"/>
    </svg>
  ),

  // 14. Ajándék (kék)
  giftBlue: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <rect x="20" y="40" width="60" height="50" rx="3" fill="#5DADE2"/>
      <rect x="15" y="30" width="70" height="15" rx="3" fill="#3498DB"/>
      <rect x="45" y="30" width="10" height="60" fill="#DC3545"/>
      <ellipse cx="40" cy="27" rx="12" ry="8" fill="#DC3545"/>
      <ellipse cx="60" cy="27" rx="12" ry="8" fill="#DC3545"/>
    </svg>
  ),

  // 15. Minta/hullámok
  pattern: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <pattern id="zigzag" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M0 10 L10 0 L20 10 L10 20 Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#zigzag)"/>
    </svg>
  ),

  // 16. Szarvas agancs
  antlers: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-1/2">
      <path d="M30 80 L30 50 L15 35 M30 50 L20 30 M30 50 L35 25"
            stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M70 80 L70 50 L85 35 M70 50 L80 30 M70 50 L65 25"
            stroke="white" strokeWidth="5" fill="none" strokeLinecap="round"/>
    </svg>
  ),

  // 17. Fenyőfa díszekkel
  christmasTree: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <polygon points="50,5 20,45 30,45 10,75 25,75 5,100 95,100 75,75 90,75 70,45 80,45" fill="#228B22"/>
      <rect x="40" y="92" width="20" height="12" fill="#8B4513"/>
      <polygon points="50,3 47,10 53,10" fill="#FFD700"/>
      <circle cx="35" cy="55" r="5" fill="#DC3545"/>
      <circle cx="60" cy="70" r="5" fill="#FFD700"/>
      <circle cx="45" cy="82" r="4" fill="#5DADE2"/>
      <circle cx="55" cy="40" r="4" fill="#FFD700"/>
    </svg>
  ),

  // 18. Pingvin
  penguin: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <ellipse cx="50" cy="60" rx="28" ry="35" fill="#2C3E50"/>
      <ellipse cx="50" cy="65" rx="18" ry="25" fill="white"/>
      <circle cx="50" cy="28" r="20" fill="#2C3E50"/>
      <circle cx="43" cy="25" r="3" fill="white"/>
      <circle cx="57" cy="25" r="3" fill="white"/>
      <circle cx="43" cy="25" r="1.5" fill="black"/>
      <circle cx="57" cy="25" r="1.5" fill="black"/>
      <polygon points="50,30 45,38 55,38" fill="#F39C12"/>
      {/* Sapka */}
      <ellipse cx="50" cy="12" rx="15" ry="8" fill="#DC3545"/>
      <circle cx="50" cy="5" r="5" fill="white"/>
    </svg>
  ),

  // 19. Masni
  bow: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <ellipse cx="30" cy="50" rx="22" ry="18" fill="#DC3545"/>
      <ellipse cx="70" cy="50" rx="22" ry="18" fill="#DC3545"/>
      <circle cx="50" cy="50" r="12" fill="#B22222"/>
      <path d="M42 60 L35 90 L50 75 L65 90 L58 60" fill="#DC3545"/>
      <circle cx="25" cy="25" r="4" fill="white" fillOpacity="0.5"/>
      <circle cx="80" cy="70" r="3" fill="white" fillOpacity="0.5"/>
    </svg>
  ),

  // 20. Sapka (szürke háttéren)
  hatGray: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <path d="M15 80 Q50 30 85 80" fill="#DC3545"/>
      <ellipse cx="50" cy="80" rx="40" ry="12" fill="white"/>
      <circle cx="80" cy="35" r="12" fill="white"/>
    </svg>
  ),

  // 21. Gömb masnival
  ornamentBow: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <circle cx="50" cy="58" r="32" fill="#228B22"/>
      <rect x="44" y="20" width="12" height="12" rx="2" fill="#8B4513"/>
      <ellipse cx="35" cy="18" rx="12" ry="8" fill="#DC3545"/>
      <ellipse cx="65" cy="18" rx="12" ry="8" fill="#DC3545"/>
      <circle cx="50" cy="18" r="6" fill="#B22222"/>
      <ellipse cx="40" cy="48" rx="6" ry="10" fill="white" fillOpacity="0.3"/>
    </svg>
  ),

  // 22. Házikó
  house: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <rect x="25" y="45" width="50" height="45" fill="#5DADE2"/>
      <polygon points="50,15 15,45 85,45" fill="#3498DB"/>
      <rect x="40" y="60" width="20" height="30" fill="#8B4513"/>
      <rect x="30" y="55" width="15" height="15" fill="#AED6F1"/>
      <rect x="55" y="55" width="15" height="15" fill="#AED6F1"/>
      <ellipse cx="50" cy="5" rx="40" ry="8" fill="white" fillOpacity="0.5"/>
      <circle cx="60" cy="35" r="8" fill="white" fillOpacity="0.6"/>
    </svg>
  ),

  // 23. Harangok
  bells: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <ellipse cx="40" cy="20" rx="10" ry="6" fill="#DC3545"/>
      <ellipse cx="60" cy="20" rx="10" ry="6" fill="#DC3545"/>
      <circle cx="50" cy="20" r="6" fill="#B22222"/>
      <path d="M25 35 Q20 50 20 65 L20 75 L50 75 L50 65 Q50 45 35 35 Q30 30 25 35" fill="#F4D03F"/>
      <ellipse cx="35" cy="75" rx="18" ry="6" fill="#D4AC0D"/>
      <circle cx="35" cy="85" r="6" fill="#F4D03F"/>
      <path d="M55 30 Q50 45 50 60 L50 70 L80 70 L80 60 Q80 40 65 30 Q60 25 55 30" fill="#F4D03F"/>
      <ellipse cx="65" cy="70" rx="18" ry="6" fill="#D4AC0D"/>
      <circle cx="65" cy="80" r="6" fill="#F4D03F"/>
    </svg>
  ),

  // 24. Koszorú
  wreath: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <circle cx="50" cy="50" r="32" stroke="#228B22" strokeWidth="18" fill="none"/>
      <circle cx="50" cy="18" r="5" fill="#DC3545"/>
      <circle cx="42" cy="20" r="4" fill="#DC3545"/>
      <circle cx="58" cy="20" r="4" fill="#DC3545"/>
      <circle cx="30" cy="35" r="4" fill="#DC3545"/>
      <circle cx="70" cy="35" r="4" fill="#DC3545"/>
    </svg>
  ),

  // 25. Hóember szarvassal
  snowmanDeer: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-3/5">
      <circle cx="50" cy="72" r="20" fill="white"/>
      <circle cx="50" cy="45" r="14" fill="white"/>
      <circle cx="50" cy="25" r="11" fill="white"/>
      {/* Szarvas agancs */}
      <path d="M35 18 L30 5 M35 18 L25 12" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M65 18 L70 5 M65 18 L75 12" stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Arc */}
      <circle cx="45" cy="23" r="2" fill="#2C3E50"/>
      <circle cx="55" cy="23" r="2" fill="#2C3E50"/>
      <circle cx="50" cy="28" r="4" fill="#DC3545"/>
      {/* Sál */}
      <rect x="36" y="35" width="28" height="5" fill="#DC3545"/>
    </svg>
  ),
}

// 25 kártya stílus definíció - pasztell színekkel
const cardStyles: CardStyle[] = [
  { bg: '#B8D4E8', numberPos: 'topLeft', icon: Icons.ornamentOrange },      // 1 - pasztell kék
  { bg: '#E8B4B8', numberPos: 'topRight', icon: Icons.snowflakes },         // 2 - pasztell rózsaszín
  { bg: '#A8C5C5', numberPos: 'topLeft', icon: Icons.trees },               // 3 - pasztell türkiz
  { bg: '#E5D4C0', numberPos: 'topLeft', icon: Icons.santaHat },            // 4 - pasztell bézs
  { bg: '#C5DCDA', numberPos: 'topRight', icon: Icons.snowflakeBig },       // 5 - pasztell zsálya
  { bg: '#B8D4E8', numberPos: 'topLeft', icon: Icons.gifts },               // 6 - pasztell kék
  { bg: '#C5DCDA', numberPos: 'topLeft', icon: Icons.stocking },            // 7 - pasztell zsálya
  { bg: '#E8B4B8', numberPos: 'topRight', icon: Icons.mug },                // 8 - pasztell rózsaszín
  { bg: '#E5D4C0', numberPos: 'topLeft', icon: Icons.mittens },             // 9 - pasztell bézs
  { bg: '#B8C4C4', numberPos: 'topRight', icon: Icons.snowman },            // 10 - pasztell szürke
  { bg: '#D4C4B0', numberPos: 'topLeft', icon: Icons.gingerbread },         // 11 - pasztell barna
  { bg: '#C5DCDA', numberPos: 'topLeft', icon: Icons.candyCane },           // 12 - pasztell zsálya
  { bg: '#D4C8E0', numberPos: 'topLeft', icon: Icons.ornamentsPink },       // 13 - pasztell lila
  { bg: '#E5D4C0', numberPos: 'topLeft', icon: Icons.giftBlue },            // 14 - pasztell bézs
  { bg: '#C5DCDA', numberPos: 'topRight', icon: Icons.pattern },            // 15 - pasztell zsálya
  { bg: '#B8C4C4', numberPos: 'topLeft', icon: Icons.antlers },             // 16 - pasztell szürke
  { bg: '#D4E8D4', numberPos: 'topLeft', icon: Icons.christmasTree },       // 17 - pasztell zöld
  { bg: '#E5D4C0', numberPos: 'topLeft', icon: Icons.penguin },             // 18 - pasztell bézs
  { bg: '#E8C4D4', numberPos: 'topLeft', icon: Icons.bow },                 // 19 - pasztell pink
  { bg: '#B8C4C4', numberPos: 'topRight', icon: Icons.hatGray },            // 20 - pasztell szürke
  { bg: '#C5DCDA', numberPos: 'topLeft', icon: Icons.ornamentBow },         // 21 - pasztell zsálya
  { bg: '#B8D4E8', numberPos: 'topLeft', icon: Icons.house },               // 22 - pasztell kék
  { bg: '#E8D8B4', numberPos: 'topLeft', icon: Icons.bells },               // 23 - pasztell arany
  { bg: '#D4E8D4', numberPos: 'center', icon: Icons.wreath },               // 24 - pasztell zöld
  { bg: '#E8B4B8', numberPos: 'topLeft', icon: Icons.snowmanDeer },         // 25 - pasztell rózsaszín
]

export default function DayWindow({
  dayNumber,
  isClickable,
  isSunday,
  dateLabel,
  onOpen
}: DayWindowProps) {
  const [isOpened, setIsOpened] = useState(false)
  const style = cardStyles[(dayNumber - 1) % cardStyles.length]

  // Vasárnapok arany háttérrel
  const bgColor = isSunday ? '#D4AF37' : style.bg

  // Szám pozíció osztályok
  const numberPositionClass = {
    topLeft: 'top-2 left-2',
    topRight: 'top-2 right-2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }[style.numberPos]

  const handleClick = () => {
    if (isClickable) {
      setIsOpened(true)
      onOpen()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={handleClick}
        disabled={!isClickable}
        style={{ backgroundColor: bgColor }}
        className={`
          relative w-full aspect-square rounded-md overflow-hidden
          ${isClickable
            ? 'cursor-pointer'
            : 'opacity-40 cursor-not-allowed grayscale'
          }
          transition-all duration-300
        `}
        // Javított árnyékok - mélyebb 3D hatás
        whileHover={isClickable ? { scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,0.3)' } : {}}
        whileTap={isClickable ? { scale: 0.95 } : {}}
        aria-label={`${dayNumber}. nap - ${dateLabel}${isClickable ? '' : ' (még nem nyitható)'}`}
        initial={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
      >
        {/* Vasárnapi arany szegély */}
        {isSunday && (
          <div className="absolute inset-0 rounded-md border-2 border-amber-400/50 pointer-events-none z-20" />
        )}

        {/* Szaggatott belső keret */}
        <div className="absolute inset-[6px] border-[1.5px] border-dashed border-white/50 rounded-sm pointer-events-none" />

        {/* Karácsonyi motívum */}
        <div className="absolute inset-0 flex items-center justify-center">
          {style.icon}
        </div>

        {/* Nap száma */}
        <span
          className={`absolute ${numberPositionClass} text-white font-bold z-10`}
          style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
            fontFamily: "'Playfair Display', serif"
          }}
        >
          {dayNumber}
        </span>

        {/* Matt zöld üveg overlay - fade animációval */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none z-15 rounded-md"
          style={{
            background: 'linear-gradient(135deg, rgba(180, 220, 200, 0.75), rgba(150, 195, 175, 0.65))',
            backdropFilter: 'blur(2px)',
          }}
        >
          {/* Üveg fényvisszaverődés */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent rounded-md" />
          {/* Belső fény effekt */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.2), inset 0 -2px 8px rgba(0,0,0,0.1)'
            }}
          />
        </motion.div>
      </motion.button>

      {/* Dátum az ablak alatt */}
      <span className="mt-1.5 text-[10px] sm:text-xs text-white/80 italic font-display capitalize">
        {dateLabel}
      </span>
    </div>
  )
}
