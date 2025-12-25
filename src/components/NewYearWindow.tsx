import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface NewYearWindowProps {
  windowNumber: number
  isClickable: boolean
  dateLabel: string
  onOpen: () => void
}

// Kártya adatok: szín, ikon, szám pozíció
interface CardStyle {
  bg: string
  numberPos: 'topLeft' | 'topRight' | 'center'
  icon: ReactNode
}

// Szilveszteri ikonok - arany, ezüst, színes
const Icons = {
  // 1. Tüzijáték (robbantás) - arany/ezüst szikrák
  fireworkBurst: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <defs>
        <radialGradient id="firework1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="100%" stopColor="#FF1744"/>
        </radialGradient>
      </defs>
      {/* Központi robbanás */}
      <circle cx="50" cy="50" r="8" fill="#FFFFFF"/>
      <circle cx="50" cy="50" r="12" fill="url(#firework1)" opacity="0.6"/>
      {/* Szikrák */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180
        const x1 = 50 + Math.cos(angle) * 15
        const y1 = 50 + Math.sin(angle) * 15
        const x2 = 50 + Math.cos(angle) * 35
        const y2 = 50 + Math.sin(angle) * 35
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF1744" : "#00E5FF"}
                strokeWidth="3" strokeLinecap="round" opacity="0.8"/>
        )
      })}
    </svg>
  ),

  // 2. Pezsgősüvegek - két üveg szikrákkal
  champagneBottles: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      {/* Bal üveg */}
      <rect x="30" y="40" width="12" height="35" rx="2" fill="#2E7D32"/>
      <rect x="30" y="35" width="12" height="6" rx="1" fill="#1B5E20"/>
      <circle cx="36" cy="32" r="3" fill="#FFD700"/>
      {/* Jobb üveg */}
      <rect x="58" y="35" width="12" height="40" rx="2" fill="#2E7D32"/>
      <rect x="58" y="30" width="12" height="6" rx="1" fill="#1B5E20"/>
      <circle cx="64" cy="27" r="3" fill="#FFD700"/>
      {/* Buborékok/szikrák */}
      <circle cx="40" cy="25" r="2" fill="#FFD700" opacity="0.7"/>
      <circle cx="45" cy="20" r="1.5" fill="#FFD700" opacity="0.8"/>
      <circle cx="55" cy="18" r="2" fill="#FFD700" opacity="0.6"/>
      <circle cx="60" cy="15" r="1.5" fill="#FFD700" opacity="0.9"/>
    </svg>
  ),

  // 3. Koccintó poharak - pezsgőspoharak buborékokkal
  toastingGlasses: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      {/* Bal pohár */}
      <path d="M25 35 L30 60 L35 35 Z" fill="none" stroke="#E0E0E0" strokeWidth="2"/>
      <rect x="29" y="60" width="2" height="15" fill="#E0E0E0"/>
      <ellipse cx="30" cy="76" rx="4" ry="2" fill="#E0E0E0"/>
      <path d="M26 40 L34 40" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7"/>
      {/* Jobb pohár */}
      <path d="M65 35 L70 60 L75 35 Z" fill="none" stroke="#E0E0E0" strokeWidth="2"/>
      <rect x="69" y="60" width="2" height="15" fill="#E0E0E0"/>
      <ellipse cx="70" cy="76" rx="4" ry="2" fill="#E0E0E0"/>
      <path d="M66 40 L74 40" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7"/>
      {/* Buborékok */}
      {[{x:28,y:45,r:1},{x:72,y:48,r:1},{x:30,y:50,r:0.8},{x:68,y:52,r:0.8}].map((b,i) =>
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#FFD700" opacity="0.6"/>
      )}
      {/* Koccinás szikrák */}
      <circle cx="50" cy="32" r="3" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="48" cy="28" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="52" cy="28" r="2" fill="#FFD700" opacity="0.8"/>
    </svg>
  ),

  // 4. Konfetti robbanás - színes papírdarabok
  confettiExplosion: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      {/* Központi robbanás */}
      <circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.9"/>
      {/* Konfetti darabok */}
      {[
        {x:35,y:30,w:5,h:8,c:"#FF1744",r:15},
        {x:65,y:35,w:6,h:5,c:"#FFD700",r:-20},
        {x:40,y:65,w:4,h:7,c:"#00E5FF",r:45},
        {x:70,y:60,w:7,h:4,c:"#76FF03",r:-30},
        {x:25,y:50,w:6,h:6,c:"#FF4081",r:0},
        {x:75,y:48,w:5,h:5,c:"#FFD700",r:35},
        {x:50,y:25,w:4,h:6,c:"#00E5FF",r:-15},
        {x:55,y:70,w:6,h:4,c:"#FF1744",r:25}
      ].map((p,i) =>
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h}
              fill={p.c} transform={`rotate(${p.r} ${p.x+p.w/2} ${p.y+p.h/2})`} opacity="0.85"/>
      )}
      {/* Körök is */}
      {[
        {x:30,y:45,r:3,c:"#76FF03"},{x:70,y:52,r:2.5,c:"#FF4081"},
        {x:45,y:28,r:2,c:"#FFD700"},{x:60,y:68,r:3,c:"#00E5FF"}
      ].map((c,i) =>
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={c.c} opacity="0.8"/>
      )}
    </svg>
  ),

  // 5. Partikürt/kalap - csillagos kúpos sapka
  partyHat: (
    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
      <defs>
        <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="100%" stopColor="#FF1744"/>
        </linearGradient>
      </defs>
      {/* Kalap kúp */}
      <path d="M50 15 L25 70 L75 70 Z" fill="url(#hatGrad)"/>
      {/* Kalap széle */}
      <ellipse cx="50" cy="70" rx="28" ry="6" fill="#FFD700"/>
      {/* Csillagok a kalapra */}
      {[{x:50,y:35},{x:40,y:50},{x:60,y:50}].map((s,i) => (
        <g key={i} transform={`translate(${s.x},${s.y})`}>
          <polygon points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1"
                   fill="#FFFFFF" opacity="0.9"/>
        </g>
      ))}
      {/* Pompon tetején */}
      <circle cx="50" cy="15" r="4" fill="#FFFFFF"/>
    </svg>
  ),

  // 6. Óra éjfélkor - 12:00-t mutató óra fénnyel
  midnightClock: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <defs>
        <radialGradient id="clockGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#FFD700"/>
        </radialGradient>
      </defs>
      {/* Fény a háttérben */}
      <circle cx="50" cy="50" r="40" fill="url(#clockGlow)" opacity="0.3"/>
      {/* Óra test */}
      <circle cx="50" cy="50" r="30" fill="#1a1a3e" stroke="#FFD700" strokeWidth="3"/>
      {/* Számok (csak 12, 3, 6, 9) */}
      <text x="50" y="28" fontSize="10" fill="#FFD700" textAnchor="middle" fontWeight="bold">12</text>
      <text x="73" y="54" fontSize="10" fill="#FFD700" textAnchor="middle">3</text>
      <text x="50" y="75" fontSize="10" fill="#FFD700" textAnchor="middle">6</text>
      <text x="27" y="54" fontSize="10" fill="#FFD700" textAnchor="middle">9</text>
      {/* Mutatók - mindkettő 12-re mutat */}
      <line x1="50" y1="50" x2="50" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="50" y2="35" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
      {/* Közép */}
      <circle cx="50" cy="50" r="4" fill="#FFD700"/>
    </svg>
  ),

  // 7. Léggömbök - arany/ezüst léggömb csokor
  balloons: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      {/* Léggömb 1 - arany */}
      <ellipse cx="35" cy="40" rx="12" ry="15" fill="#FFD700"/>
      <path d="M35 55 Q33 60 35 65" stroke="#FFD700" strokeWidth="1" fill="none"/>
      <ellipse cx="32" cy="35" rx="4" ry="6" fill="#FFFFFF" opacity="0.4"/>
      {/* Léggömb 2 - ezüst */}
      <ellipse cx="50" cy="30" rx="13" ry="16" fill="#C0C0C0"/>
      <path d="M50 46 Q48 52 50 60" stroke="#C0C0C0" strokeWidth="1" fill="none"/>
      <ellipse cx="47" cy="25" rx="4" ry="6" fill="#FFFFFF" opacity="0.5"/>
      {/* Léggömb 3 - arany */}
      <ellipse cx="65" cy="42" rx="11" ry="14" fill="#FFD700"/>
      <path d="M65 56 Q63 62 65 68" stroke="#FFD700" strokeWidth="1" fill="none"/>
      <ellipse cx="62" cy="37" rx="3" ry="5" fill="#FFFFFF" opacity="0.4"/>
      {/* Zsinórok találkozása */}
      <line x1="35" y1="65" x2="50" y2="75" stroke="#888" strokeWidth="0.5"/>
      <line x1="50" y1="60" x2="50" y2="75" stroke="#888" strokeWidth="0.5"/>
      <line x1="65" y1="68" x2="50" y2="75" stroke="#888" strokeWidth="0.5"/>
      {/* Csomó */}
      <circle cx="50" cy="75" r="2" fill="#FF1744"/>
    </svg>
  ),

  // 8. Csillagszóró - kézi csillagszórók fénycsíkokkal
  sparklers: (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      {/* Bal csillagszóró */}
      <line x1="30" y1="70" x2="25" y2="40" stroke="#8B7355" strokeWidth="2"/>
      {/* Szikrák */}
      {[
        {x:24,y:35,l:8,a:-30},{x:26,y:38,l:10,a:0},{x:23,y:42,l:7,a:-45},
        {x:27,y:44,l:9,a:30},{x:25,y:33,l:6,a:-15}
      ].map((s,i) => (
        <line key={i} x1={s.x} y1={s.y}
              x2={s.x + Math.cos(s.a * Math.PI/180) * s.l}
              y2={s.y + Math.sin(s.a * Math.PI/180) * s.l}
              stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
      ))}
      <circle cx="25" cy="40" r="3" fill="#FFFFFF" opacity="0.8"/>

      {/* Jobb csillagszóró */}
      <line x1="70" y1="70" x2="75" y2="35" stroke="#8B7355" strokeWidth="2"/>
      {/* Szikrák */}
      {[
        {x:76,y:30,l:9,a:30},{x:74,y:33,l:8,a:0},{x:77,y:37,l:7,a:45},
        {x:73,y:39,l:10,a:-30},{x:75,y:28,l:6,a:15}
      ].map((s,i) => (
        <line key={`r${i}`} x1={s.x} y1={s.y}
              x2={s.x + Math.cos(s.a * Math.PI/180) * s.l}
              y2={s.y + Math.sin(s.a * Math.PI/180) * s.l}
              stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
      ))}
      <circle cx="75" cy="35" r="3" fill="#FFFFFF" opacity="0.8"/>
    </svg>
  ),

  // 9. "2026" szám - csillogó évszám
  year2026: (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
      <defs>
        <linearGradient id="yearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="50%" stopColor="#FFFFFF"/>
          <stop offset="100%" stopColor="#FFD700"/>
        </linearGradient>
      </defs>
      <text x="50" y="60" fontSize="32" fill="url(#yearGrad)"
            textAnchor="middle" fontWeight="bold" fontFamily="Arial, sans-serif">
        2026
      </text>
      {/* Csillogás effekt */}
      {[{x:15,y:35},{x:85,y:40},{x:30,y:70},{x:75,y:68},{x:50,y:30}].map((s,i) => (
        <g key={i} transform={`translate(${s.x},${s.y}) scale(0.8)`}>
          <polygon points="0,-3 0.8,-0.8 3,0 0.8,0.8 0,3 -0.8,0.8 -3,0 -0.8,-0.8"
                   fill="#FFFFFF" opacity="0.9"/>
        </g>
      ))}
    </svg>
  ),

  // 10. Tüzijáték finálé - nagy többszörös tűzijáték (ARANY - Window 10-hez)
  fireworkFinale: (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
      <defs>
        <radialGradient id="finaleGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="50%" stopColor="#FFD700"/>
          <stop offset="100%" stopColor="#FF1744"/>
        </radialGradient>
      </defs>
      {/* Nagy központi robbanás */}
      <circle cx="50" cy="50" r="35" fill="url(#finaleGlow)" opacity="0.3"/>
      <circle cx="50" cy="50" r="10" fill="#FFFFFF"/>
      <circle cx="50" cy="50" r="15" fill="#FFD700" opacity="0.5"/>
      {/* Fő szikrák (nagyobb) */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5) * Math.PI / 180
        const x1 = 50 + Math.cos(angle) * 18
        const y1 = 50 + Math.sin(angle) * 18
        const x2 = 50 + Math.cos(angle) * 42
        const y2 = 50 + Math.sin(angle) * 42
        const color = i % 4 === 0 ? "#FFD700" : i % 4 === 1 ? "#FFFFFF" : i % 4 === 2 ? "#FF1744" : "#00E5FF"
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
        )
      })}
      {/* Másodlagos szikrák */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 + 22.5) * Math.PI / 180
        const x = 50 + Math.cos(angle) * 40
        const y = 50 + Math.sin(angle) * 40
        return (
          <circle key={`s${i}`} cx={x} cy={y} r="3" fill="#FFD700" opacity="0.8"/>
        )
      })}
    </svg>
  )
}

// 10 egyedi kártya stílus a 10 ablakhoz
const cardStyles: CardStyle[] = [
  // 1. Dec 27 délelőtt - Arany háttér
  { bg: 'from-amber-100 to-amber-200', numberPos: 'topLeft', icon: Icons.fireworkBurst },

  // 2. Dec 27 este - Ezüst háttér
  { bg: 'from-gray-100 to-gray-200', numberPos: 'topRight', icon: Icons.champagneBottles },

  // 3. Dec 28 délelőtt - Pezsgő krém
  { bg: 'from-amber-50 to-yellow-100', numberPos: 'center', icon: Icons.toastingGlasses },

  // 4. Dec 28 este - Világos kék
  { bg: 'from-blue-100 to-blue-200', numberPos: 'topLeft', icon: Icons.confettiExplosion },

  // 5. Dec 29 délelőtt - Rózsaszín
  { bg: 'from-pink-100 to-pink-200', numberPos: 'topRight', icon: Icons.partyHat },

  // 6. Dec 29 este - Sötét kék-szürke
  { bg: 'from-slate-200 to-slate-300', numberPos: 'center', icon: Icons.midnightClock },

  // 7. Dec 30 délelőtt - Világos arany
  { bg: 'from-yellow-100 to-yellow-200', numberPos: 'topLeft', icon: Icons.balloons },

  // 8. Dec 30 este - Lila-rózsaszín
  { bg: 'from-purple-100 to-pink-100', numberPos: 'topRight', icon: Icons.sparklers },

  // 9. Dec 31 délelőtt - Türkiz-kék
  { bg: 'from-cyan-100 to-blue-100', numberPos: 'center', icon: Icons.year2026 },

  // 10. Dec 31 este (SZILVESZTER) - SPECIÁLIS ARANY
  { bg: 'from-yellow-200 via-amber-300 to-yellow-200', numberPos: 'center', icon: Icons.fireworkFinale }
]

export default function NewYearWindow({
  windowNumber,
  isClickable,
  dateLabel,
  onOpen
}: NewYearWindowProps) {
  const style = cardStyles[windowNumber - 1]

  return (
    <motion.button
      onClick={isClickable ? onOpen : undefined}
      disabled={!isClickable}
      className={`
        relative aspect-square w-full overflow-hidden rounded-2xl
        bg-gradient-to-br ${style.bg}
        border-4 ${windowNumber === 10 ? 'border-amber-400' : 'border-white/40'}
        shadow-lg
        ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-40 grayscale'}
      `}
      whileHover={isClickable ? { scale: 1.05 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
      aria-label={`${windowNumber}. ablak - ${dateLabel}${!isClickable ? ' (még nem nyitható)' : ''}`}
    >
      {/* Matt sötét üveg overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-transparent to-gray-900/10 backdrop-blur-[1px]"/>

      {/* Üveg csillogás effekt */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 to-transparent"/>
        <div className="absolute top-1/4 left-0 w-2/3 h-1 bg-white/30 blur-sm"/>
      </div>

      {/* Belső szaggatott keret */}
      <div className="absolute inset-3 border-2 border-dashed border-white/50 rounded-xl pointer-events-none"/>

      {/* Ikon */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {style.icon}
      </div>

      {/* Ablak szám */}
      <div className={`
        absolute z-20 font-bold text-slate-700
        ${style.numberPos === 'topLeft' ? 'top-2 left-3' : ''}
        ${style.numberPos === 'topRight' ? 'top-2 right-3' : ''}
        ${style.numberPos === 'center' ? 'top-2 left-1/2 -translate-x-1/2' : ''}
        ${windowNumber === 10 ? 'text-amber-700 drop-shadow-lg' : ''}
      `}
        style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}
      >
        {windowNumber}
      </div>

      {/* Dátum címke (alul) */}
      <div className="absolute bottom-1 left-0 right-0 text-center z-20">
        <span className="text-[clamp(0.5rem, 2vw, 0.7rem)] font-medium text-slate-600 px-2">
          {dateLabel}
        </span>
      </div>

      {/* Window 10 speciális arany fény */}
      {windowNumber === 10 && (
        <div className="absolute inset-0 bg-gradient-radial from-yellow-300/20 via-transparent to-transparent animate-pulse pointer-events-none"/>
      )}
    </motion.button>
  )
}
