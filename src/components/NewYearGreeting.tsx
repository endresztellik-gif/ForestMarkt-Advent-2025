import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Konfetti háttér
function ConfettiFallBackground() {
  const confetti = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      color: ['#FFD700', '#FF1744', '#00E5FF', '#76FF03', '#FF4081'][Math.floor(Math.random() * 5)],
      size: `${0.4 + Math.random() * 0.6}rem`,
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
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
            borderRadius: '50%',
            opacity: 0.6,
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
    <div className="fixed inset-0 pointer-events-none z-6 overflow-hidden">
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
    <div className="fixed inset-0 pointer-events-none z-7 overflow-hidden">
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

// Spirálisan letekeredő szerpentinek
function SerpentineSpirals() {
  const serpentines = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${5 + i * 10}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${6 + Math.random() * 6}s`,
      color: ['#FFD700', '#C0C0C0', '#FF1744', '#00E5FF', '#76FF03'][Math.floor(Math.random() * 5)],
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-8 overflow-hidden">
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

export default function NewYearGreeting() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3e] overflow-hidden relative flex items-center justify-center">
      {/* Konfetti háttér */}
      <ConfettiFallBackground />

      {/* Parti sisakok/kalapok */}
      <PartyHats />

      {/* Színes lufikat */}
      <Balloons />

      {/* Spirális szerpentinek */}
      <SerpentineSpirals />

      {/* Koccintó pezsgős poharak (nagy, háttérben) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="600" height="600" viewBox="0 0 200 200" className="opacity-10">
          {/* Bal pohár */}
          <path d="M50 70 L60 120 L70 70 Z" fill="none" stroke="#E0E0E0" strokeWidth="3"/>
          <rect x="58" y="120" width="4" height="30" fill="#E0E0E0"/>
          <ellipse cx="60" cy="152" rx="8" ry="4" fill="#E0E0E0"/>
          <path d="M52 80 L68 80" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.7"/>

          {/* Jobb pohár */}
          <path d="M130 70 L140 120 L150 70 Z" fill="none" stroke="#E0E0E0" strokeWidth="3"/>
          <rect x="138" y="120" width="4" height="30" fill="#E0E0E0"/>
          <ellipse cx="140" cy="152" rx="8" ry="4" fill="#E0E0E0"/>
          <path d="M132 80 L148 80" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.7"/>

          {/* Koccinás szikrák */}
          <circle cx="100" cy="64" r="6" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="96" cy="56" r="4" fill="#FFD700" opacity="0.8"/>
          <circle cx="104" cy="56" r="4" fill="#FFD700" opacity="0.8"/>
          <circle cx="92" cy="60" r="3" fill="#FFFFFF" opacity="0.7"/>
          <circle cx="108" cy="60" r="3" fill="#FFFFFF" opacity="0.7"/>
        </svg>
      </motion.div>

      {/* Központi üzenet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-8 max-w-4xl"
      >
        {/* Dekoratív csillag */}
        <motion.div
          className="inline-block mb-6"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="80" height="80" viewBox="0 0 50 50" className="drop-shadow-[0_0_20px_rgba(255,215,0,0.9)]">
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-8 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.4)'
          }}
        >
          Boldog Új Évet
          <br />
          Kíván a ForestMarkt!
        </motion.h1>

        {/* Alcím */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl md:text-3xl font-serif italic text-amber-100/90 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          2026
        </motion.p>

        {/* Dekoratív vonal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-64 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"
          style={{
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)'
          }}
        />

        {/* Jókívánság */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-amber-50/80 italic max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          "Legyen ez az év tele örömmel, egészséggel és sikerrel!"
        </motion.p>
      </motion.div>

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
  )
}
