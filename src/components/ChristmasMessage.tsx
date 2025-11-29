import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Hópehely komponens
function Snowflake({ delay, duration, left }: { delay: number; duration: number; left: number }) {
  return (
    <motion.div
      className="absolute text-white/60 pointer-events-none select-none"
      style={{ left: `${left}%`, top: -20 }}
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: '100vh',
        opacity: [0, 1, 1, 0],
        x: [0, 30, -30, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      ❄
    </motion.div>
  )
}

export default function ChristmasMessage() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; delay: number; duration: number; left: number }>>([])

  useEffect(() => {
    // 30 hópehely generálása véletlenszerű pozíciókkal
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 7,
      left: Math.random() * 100
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
         style={{
           background: 'linear-gradient(to bottom, #0a1628 0%, #1a2a4a 50%, #2a3a5a 100%)'
         }}>

      {/* Háttér karácsonyfa - flat design stílus */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <svg
          viewBox="0 0 300 420"
          className="w-[70vw] h-[75vh] max-w-lg opacity-40"
        >
          {/* Fa rétegek - flat design */}
          {/* Felső réteg */}
          <polygon points="150,40 100,120 200,120" fill="#2d8a4e"/>
          <polygon points="150,40 115,100 185,100" fill="#34a058"/>

          {/* Középső réteg */}
          <polygon points="150,90 75,190 225,190" fill="#28784a"/>
          <polygon points="150,90 95,170 205,170" fill="#2d8a4e"/>

          {/* Alsó réteg */}
          <polygon points="150,155 50,290 250,290" fill="#236b42"/>
          <polygon points="150,155 75,265 225,265" fill="#28784a"/>

          {/* Fatörzs */}
          <rect x="125" y="285" width="50" height="45" rx="3" fill="#6b4423"/>
          <rect x="130" y="285" width="15" height="45" fill="#7d5a35" opacity="0.5"/>

          {/* Csillag a tetején */}
          <polygon
            points="150,25 154,37 167,37 157,45 160,57 150,50 140,57 143,45 133,37 146,37"
            fill="#FFD700"
          />
          <circle cx="150" cy="42" r="12" fill="#FFD700" opacity="0.4"/>

          {/* Díszek - arany és piros gömbök */}
          {[
            { cx: 150, cy: 85, color: '#FFD700' },
            { cx: 120, cy: 115, color: '#dc3545' },
            { cx: 180, cy: 115, color: '#FFD700' },
            { cx: 100, cy: 160, color: '#FFD700' },
            { cx: 150, cy: 145, color: '#dc3545' },
            { cx: 200, cy: 160, color: '#FFD700' },
            { cx: 80, cy: 220, color: '#dc3545' },
            { cx: 130, cy: 200, color: '#FFD700' },
            { cx: 170, cy: 200, color: '#dc3545' },
            { cx: 220, cy: 220, color: '#FFD700' },
            { cx: 70, cy: 265, color: '#FFD700' },
            { cx: 115, cy: 250, color: '#dc3545' },
            { cx: 150, cy: 260, color: '#FFD700' },
            { cx: 185, cy: 250, color: '#dc3545' },
            { cx: 230, cy: 265, color: '#FFD700' },
          ].map((ornament, i) => (
            <g key={i}>
              {/* Glow effekt */}
              <circle
                cx={ornament.cx}
                cy={ornament.cy}
                r="12"
                fill={ornament.color}
                opacity="0.4"
              />
              {/* Gömb */}
              <circle
                cx={ornament.cx}
                cy={ornament.cy}
                r="6"
                fill={ornament.color}
              />
              {/* Fényvisszaverődés */}
              <circle
                cx={ornament.cx - 2}
                cy={ornament.cy - 2}
                r="2"
                fill="white"
                opacity="0.7"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Havazás effekt */}
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          delay={flake.delay}
          duration={flake.duration}
          left={flake.left}
        />
      ))}

      {/* Karácsonyi üzenet előtérben */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-relaxed"
            style={{
              textShadow: `
                0 0 10px rgba(255, 200, 100, 0.9),
                0 0 20px rgba(255, 180, 80, 0.7),
                0 0 40px rgba(255, 150, 50, 0.5),
                0 0 60px rgba(255, 120, 30, 0.4),
                0 0 80px rgba(255, 100, 20, 0.3),
                2px 2px 4px rgba(0,0,0,0.5)
              `
            }}>
          Áldott, békés karácsonyt
          <br />
          kíván a ForestMarkt!
        </h1>

        {/* Dekoratív vonal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 h-1 w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          style={{ boxShadow: '0 0 15px rgba(255, 200, 100, 0.6)' }}
        />

        {/* Dátum */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-6 text-white/70 text-sm sm:text-base italic"
        >
          2025. december 25-26.
        </motion.p>
      </motion.div>
    </div>
  )
}
