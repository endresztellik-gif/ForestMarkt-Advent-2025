import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import NewYearWindow from './NewYearWindow'
import PhotoModal from './PhotoModal'
import { isNewYearWindowUnlocked, formatNewYearLabel } from '../utils/dateUtils'
import { newYearQuotes } from '../data/newYearQuotes'

// Konfetti hullás animáció
function ConfettiFall() {
  const confetti = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      color: ['#FFD700', '#FF1744', '#00E5FF', '#76FF03', '#FF4081'][Math.floor(Math.random() * 5)],
      shape: 'circle',  // Csak kerekek
      size: `${0.4 + Math.random() * 0.6}rem`,
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: piece.left,
            top: '-20px',
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === 'circle' ? '50%' : '0%',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  )
}

// Szerpentin szalagok animáció - SPIRÁLIS
function SerpentineRibbons() {
  const serpentines = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + i * 12}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${6 + Math.random() * 4}s`,
      color: ['#FFD700', '#C0C0C0', '#FF1744', '#00E5FF'][Math.floor(Math.random() * 4)],
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-25 overflow-hidden">
      {serpentines.map((ribbon) => (
        <div
          key={ribbon.id}
          className="absolute w-2 h-60 animate-serpentine-spiral"
          style={{
            left: ribbon.left,
            top: '-80px',
            animationDelay: ribbon.delay,
            animationDuration: ribbon.duration,
            background: `linear-gradient(to bottom, ${ribbon.color}, transparent)`,
            borderRadius: '2px',
            transformOrigin: 'top center',
          }}
        />
      ))}
    </div>
  )
}

// Parti sisakok/kalapok hulló animáció
function PartyHats() {
  const hats = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + i * 12}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${8 + Math.random() * 6}s`,
      color: ['#FFD700', '#FF1744', '#00E5FF', '#76FF03', '#FF4081', '#C0C0C0'][Math.floor(Math.random() * 6)],
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-26 overflow-hidden">
      {hats.map((hat) => (
        <div
          key={hat.id}
          className="absolute animate-partyhat"
          style={{
            left: hat.left,
            top: '-80px',
            animationDelay: hat.delay,
            animationDuration: hat.duration,
          }}
        >
          {/* Parti sisak SVG */}
          <svg width="40" height="50" viewBox="0 0 40 50" className="opacity-60">
            {/* Kúp */}
            <path d="M20 5 L5 35 L35 35 Z" fill={hat.color} stroke="#FFFFFF" strokeWidth="1"/>
            {/* Csillag a tetején */}
            <polygon points="20,2 22,8 28,8 23,12 25,18 20,14 15,18 17,12 12,8 18,8" fill="#FFFFFF" opacity="0.9"/>
            {/* Pompom */}
            <circle cx="20" cy="3" r="3" fill="#FFFFFF" opacity="0.8"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

// Színes lufikat hulló/lebegő animáció
function Balloons() {
  const balloons = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${8 + i * 10}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 8}s`,
      color: ['#FFD700', '#FF1744', '#00E5FF', '#76FF03', '#FF4081', '#FFA500'][Math.floor(Math.random() * 6)],
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-27 overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-balloon"
          style={{
            left: balloon.left,
            bottom: '-100px',
            animationDelay: balloon.delay,
            animationDuration: balloon.duration,
          }}
        >
          {/* Lufi SVG */}
          <svg width="35" height="50" viewBox="0 0 35 50" className="opacity-50">
            {/* Lufi test */}
            <ellipse cx="17.5" cy="20" rx="13" ry="17" fill={balloon.color} stroke="#FFFFFF" strokeWidth="1"/>
            {/* Fény hatás */}
            <ellipse cx="14" cy="15" rx="4" ry="6" fill="#FFFFFF" opacity="0.4"/>
            {/* Zsinór */}
            <path d="M17.5 37 Q15 42, 17.5 47" fill="none" stroke="#E0E0E0" strokeWidth="1"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

// Lehulló koccintó pezsgős poharak
function ChampagneGlasses() {
  const glasses = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${15 + i * 15}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 4}s`,
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {glasses.map((glass) => (
        <div
          key={glass.id}
          className="absolute animate-champagne"
          style={{
            left: glass.left,
            top: '-100px',
            animationDelay: glass.delay,
            animationDuration: glass.duration,
          }}
        >
          {/* Koccintó poharak SVG */}
          <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-40">
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
            {/* Koccinás szikrák */}
            <circle cx="50" cy="32" r="3" fill="#FFFFFF" opacity="0.9"/>
            <circle cx="48" cy="28" r="2" fill="#FFD700" opacity="0.8"/>
            <circle cx="52" cy="28" r="2" fill="#FFD700" opacity="0.8"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function NewYearCalendar() {
  const [selectedWindow, setSelectedWindow] = useState<number | null>(null)

  const handleOpenWindow = (windowNumber: number) => {
    setSelectedWindow(windowNumber)
  }

  const handleCloseModal = () => {
    setSelectedWindow(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3e] overflow-hidden relative">
      {/* Konfetti, szerpentinek, pezsgős poharak, kalapok, lufikat */}
      <ConfettiFall />
      <SerpentineRibbons />
      <PartyHats />
      <Balloons />
      <ChampagneGlasses />

      {/* Fő tartalom */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Fejléc */}
        <header className="pt-8 pb-6 px-4 text-center">
          {/* Dekoratív csillag fénnyel */}
          <motion.div
            className="inline-block mb-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50" className="drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]">
              <polygon
                points="25,5 30,20 45,20 33,28 37,43 25,35 13,43 17,28 5,20 20,20"
                fill="#FFD700"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Főcím */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-3 pb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
              lineHeight: '1.3'
            }}
          >
            Boldog Új Évet Kíván a ForestMarkt!
          </motion.h1>

          {/* Dekoratív vonal */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-48 h-1 mx-auto my-4 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)'
            }}
          />

          {/* Alcím */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl font-serif italic text-amber-100/90 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            2025 → 2026
          </motion.p>
        </header>

        {/* Naptár rács - 5x2 layout (5 oszlop × 2 sor) */}
        <main className="flex-1 px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }, (_, i) => {
                const windowNumber = i + 1
                const isClickable = isNewYearWindowUnlocked(windowNumber)
                const dateLabel = formatNewYearLabel(windowNumber)

                return (
                  <motion.div
                    key={windowNumber}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <NewYearWindow
                      windowNumber={windowNumber}
                      isClickable={isClickable}
                      dateLabel={dateLabel}
                      onOpen={() => handleOpenWindow(windowNumber)}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </main>

        {/* ForestMarkt logo (jobb alsó sarok) */}
        <div className="fixed bottom-4 right-4 z-20 opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <img
            src="/logo/ForestMarkt_logo_white.png"
            alt="ForestMarkt"
            className="h-12 w-auto drop-shadow-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      </div>

      {/* PhotoModal */}
      {selectedWindow !== null && (
        <PhotoModal
          dayNumber={selectedWindow}
          photoPath={`/newyear/${selectedWindow}.jpg`}
          quote={newYearQuotes[selectedWindow - 1]}
          dateLabel={formatNewYearLabel(selectedWindow)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
