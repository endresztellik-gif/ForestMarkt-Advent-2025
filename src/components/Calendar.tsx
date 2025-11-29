import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import DayWindow from './DayWindow'
import PhotoModal from './PhotoModal'
import { isDateUnlocked, isSunday, formatDateLabel, TEST_MODE } from '../utils/dateUtils'
import { adventQuotes } from '../data/quotes'

// Hulló hópelyhek animáció
function Snowfall() {
  const snowflakes = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${12 + Math.random() * 12}s`,
      size: `${0.6 + Math.random() * 0.6}rem`,
      opacity: 0.25 + Math.random() * 0.35,
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white animate-snowfall"
          style={{
            left: flake.left,
            top: '-20px',
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: flake.size,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}

// Sűrű háttér dekorációk - ablakok MÖGÖTT
function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Hópelyhek - nagyon sok, különböző méretben és pozícióban */}
      {[
        { top: '2%', left: '2%', size: 'w-12 h-12', opacity: 'opacity-[0.1]' },
        { top: '5%', left: '12%', size: 'w-8 h-8', opacity: 'opacity-[0.07]' },
        { top: '8%', left: '25%', size: 'w-6 h-6', opacity: 'opacity-[0.06]' },
        { top: '3%', right: '5%', size: 'w-14 h-14', opacity: 'opacity-[0.08]' },
        { top: '10%', right: '18%', size: 'w-9 h-9', opacity: 'opacity-[0.06]' },
        { top: '15%', left: '5%', size: 'w-16 h-16', opacity: 'opacity-[0.07]' },
        { top: '18%', right: '8%', size: 'w-10 h-10', opacity: 'opacity-[0.09]' },
        { top: '22%', left: '15%', size: 'w-7 h-7', opacity: 'opacity-[0.05]' },
        { top: '28%', right: '3%', size: 'w-11 h-11', opacity: 'opacity-[0.08]' },
        { top: '32%', left: '3%', size: 'w-9 h-9', opacity: 'opacity-[0.07]' },
        { top: '38%', right: '12%', size: 'w-8 h-8', opacity: 'opacity-[0.06]' },
        { top: '42%', left: '8%', size: 'w-13 h-13', opacity: 'opacity-[0.08]' },
        { top: '48%', right: '5%', size: 'w-10 h-10', opacity: 'opacity-[0.07]' },
        { top: '52%', left: '2%', size: 'w-14 h-14', opacity: 'opacity-[0.06]' },
        { top: '58%', right: '15%', size: 'w-7 h-7', opacity: 'opacity-[0.09]' },
        { top: '62%', left: '10%', size: 'w-8 h-8', opacity: 'opacity-[0.05]' },
        { top: '68%', right: '2%', size: 'w-12 h-12', opacity: 'opacity-[0.08]' },
        { top: '72%', left: '5%', size: 'w-9 h-9', opacity: 'opacity-[0.07]' },
        { top: '78%', right: '10%', size: 'w-11 h-11', opacity: 'opacity-[0.06]' },
        { top: '82%', left: '12%', size: 'w-6 h-6', opacity: 'opacity-[0.09]' },
        { top: '88%', right: '5%', size: 'w-10 h-10', opacity: 'opacity-[0.08]' },
        { top: '92%', left: '3%', size: 'w-8 h-8', opacity: 'opacity-[0.07]' },
      ].map((pos, i) => (
        <svg key={`snow-${i}`} className={`absolute ${pos.size} text-white ${pos.opacity}`}
             style={{ top: pos.top, left: pos.left, right: pos.right }} viewBox="0 0 100 100">
          <g stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="50" y1="10" x2="50" y2="90"/>
            <line x1="10" y1="50" x2="90" y2="50"/>
            <line x1="25" y1="25" x2="75" y2="75"/>
            <line x1="75" y1="25" x2="25" y2="75"/>
            <line x1="50" y1="10" x2="40" y2="22"/><line x1="50" y1="10" x2="60" y2="22"/>
            <line x1="50" y1="90" x2="40" y2="78"/><line x1="50" y1="90" x2="60" y2="78"/>
            <line x1="10" y1="50" x2="22" y2="40"/><line x1="10" y1="50" x2="22" y2="60"/>
            <line x1="90" y1="50" x2="78" y2="40"/><line x1="90" y1="50" x2="78" y2="60"/>
          </g>
          <circle cx="50" cy="50" r="5" fill="currentColor"/>
        </svg>
      ))}

      {/* Karácsonyfadíszek / Gömbök - több és nagyobb */}
      {[
        { top: '8%', right: '3%', size: 'w-10 h-14', color: 'text-red-400/15' },
        { top: '15%', left: '1%', size: 'w-8 h-11', color: 'text-amber-400/12' },
        { top: '25%', right: '8%', size: 'w-9 h-12', color: 'text-rose-300/14' },
        { top: '35%', left: '3%', size: 'w-11 h-15', color: 'text-amber-300/10' },
        { top: '45%', right: '2%', size: 'w-8 h-11', color: 'text-red-300/13' },
        { top: '55%', left: '5%', size: 'w-10 h-13', color: 'text-amber-400/11' },
        { top: '65%', right: '6%', size: 'w-7 h-10', color: 'text-rose-400/12' },
        { top: '75%', left: '2%', size: 'w-9 h-12', color: 'text-red-400/14' },
        { top: '85%', right: '4%', size: 'w-8 h-11', color: 'text-amber-300/13' },
      ].map((pos, i) => (
        <svg key={`orn-${i}`} className={`absolute ${pos.size} ${pos.color}`}
             style={{ top: pos.top, left: pos.left, right: pos.right }} viewBox="0 0 50 70">
          <rect x="20" y="0" width="10" height="8" fill="currentColor"/>
          <circle cx="25" cy="42" r="22" fill="currentColor"/>
          <ellipse cx="18" cy="35" rx="4" ry="6" fill="white" fillOpacity="0.2"/>
        </svg>
      ))}

      {/* Flat-design fenyőfák - több és részben takarásban */}
      {[
        { top: '10%', left: '-2%', size: 'w-20 h-28', opacity: 'opacity-[0.12]' },
        { top: '30%', right: '-3%', size: 'w-24 h-32', opacity: 'opacity-[0.1]' },
        { top: '55%', left: '-1%', size: 'w-18 h-24', opacity: 'opacity-[0.13]' },
        { top: '75%', right: '-2%', size: 'w-22 h-30', opacity: 'opacity-[0.11]' },
        { bottom: '-5%', left: '10%', size: 'w-16 h-22', opacity: 'opacity-[0.12]' },
        { bottom: '-8%', right: '15%', size: 'w-20 h-28', opacity: 'opacity-[0.1]' },
      ].map((pos, i) => (
        <svg key={`tree-${i}`} className={`absolute ${pos.size} ${pos.opacity}`}
             style={{ top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right }} viewBox="0 0 60 84">
          {/* Flat design fa rétegek */}
          <polygon points="30,8 20,24 40,24" fill="#2d8a4e"/>
          <polygon points="30,8 23,20 37,20" fill="#34a058"/>
          <polygon points="30,18 15,38 45,38" fill="#28784a"/>
          <polygon points="30,18 19,34 41,34" fill="#2d8a4e"/>
          <polygon points="30,32 10,56 50,56" fill="#236b42"/>
          <polygon points="30,32 15,52 45,52" fill="#28784a"/>
          {/* Fatörzs */}
          <rect x="25" y="54" width="10" height="9" rx="1" fill="#6b4423"/>
          <rect x="26" y="54" width="3" height="9" fill="#7d5a35" opacity="0.5"/>
          {/* Csillag */}
          <polygon points="30,5 31,9 35,9 32,11 33,15 30,13 27,15 28,11 25,9 29,9" fill="#FFD700"/>
          {/* Díszek */}
          <circle cx="30" cy="17" r="2" fill="#FFD700"/>
          <circle cx="24" cy="30" r="1.8" fill="#dc3545"/>
          <circle cx="36" cy="30" r="1.8" fill="#FFD700"/>
          <circle cx="20" cy="45" r="2" fill="#dc3545"/>
          <circle cx="30" cy="42" r="1.8" fill="#FFD700"/>
          <circle cx="40" cy="45" r="2" fill="#dc3545"/>
        </svg>
      ))}

      {/* Csillagok - több */}
      {[
        { top: '5%', left: '20%', size: 'w-6 h-6', opacity: 'opacity-[0.12]' },
        { top: '12%', right: '22%', size: 'w-5 h-5', opacity: 'opacity-[0.1]' },
        { top: '25%', left: '18%', size: 'w-4 h-4', opacity: 'opacity-[0.08]' },
        { top: '40%', right: '20%', size: 'w-5 h-5', opacity: 'opacity-[0.09]' },
        { top: '55%', left: '22%', size: 'w-6 h-6', opacity: 'opacity-[0.11]' },
        { top: '70%', right: '18%', size: 'w-4 h-4', opacity: 'opacity-[0.08]' },
        { top: '85%', left: '25%', size: 'w-5 h-5', opacity: 'opacity-[0.1]' },
      ].map((pos, i) => (
        <svg key={`star-${i}`} className={`absolute ${pos.size} text-amber-200 ${pos.opacity}`}
             style={{ top: pos.top, left: pos.left, right: pos.right }} viewBox="0 0 100 100">
          <polygon points="50,5 61,35 95,35 68,57 78,90 50,70 22,90 33,57 5,35 39,35" fill="currentColor"/>
        </svg>
      ))}

      {/* Hold - nagyobb és láthatóbb */}
      <svg className="absolute top-[20%] right-[1%] w-24 h-24 text-amber-100/[0.08]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="currentColor"/>
        <circle cx="68" cy="50" r="40" fill="#1B4D3E"/>
      </svg>

      {/* Harangok */}
      <svg className="absolute top-[60%] left-[1%] w-12 h-14 text-amber-300/[0.1]" viewBox="0 0 50 60">
        <path d="M25 10 Q15 20 15 35 L15 45 L35 45 L35 35 Q35 20 25 10" fill="currentColor"/>
        <circle cx="25" cy="52" r="6" fill="currentColor"/>
        <ellipse cx="25" cy="8" rx="6" ry="4" fill="currentColor"/>
      </svg>
      <svg className="absolute top-[85%] right-[12%] w-10 h-12 text-amber-300/[0.09]" viewBox="0 0 50 60">
        <path d="M25 10 Q15 20 15 35 L15 45 L35 45 L35 35 Q35 20 25 10" fill="currentColor"/>
        <circle cx="25" cy="52" r="6" fill="currentColor"/>
        <ellipse cx="25" cy="8" rx="6" ry="4" fill="currentColor"/>
      </svg>

      {/* Cukorpálcák */}
      <svg className="absolute top-[40%] left-[0%] w-8 h-16 opacity-[0.08]" viewBox="0 0 40 80">
        <defs>
          <pattern id="candy1" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <rect width="4" height="8" fill="#DC3545"/>
            <rect x="4" width="4" height="8" fill="white"/>
          </pattern>
        </defs>
        <path d="M20 75 L20 30 Q20 10 10 10 Q0 10 0 20" stroke="url(#candy1)" strokeWidth="8" fill="none" strokeLinecap="round"/>
      </svg>

      {/* Ajándékdobozok */}
      <svg className="absolute bottom-[5%] left-[2%] w-14 h-12 opacity-[0.1]" viewBox="0 0 60 50">
        <rect x="5" y="15" width="50" height="35" rx="2" fill="#5DADE2"/>
        <rect x="0" y="8" width="60" height="10" rx="2" fill="#3498DB"/>
        <rect x="25" y="8" width="10" height="42" fill="#DC3545"/>
        <ellipse cx="22" cy="6" rx="8" ry="5" fill="#DC3545"/>
        <ellipse cx="38" cy="6" rx="8" ry="5" fill="#DC3545"/>
      </svg>
    </div>
  )
}

// Előtér dekorációk - ablakok FELETT (félig áttetsző)
function ForegroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-15 opacity-25">
      {/* Nagy hópelyhek a sarkoknál */}
      <svg className="absolute top-[5%] right-[5%] w-24 h-24 text-white" viewBox="0 0 100 100">
        <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5">
          <line x1="50" y1="5" x2="50" y2="95"/>
          <line x1="5" y1="50" x2="95" y2="50"/>
          <line x1="20" y1="20" x2="80" y2="80"/>
          <line x1="80" y1="20" x2="20" y2="80"/>
        </g>
      </svg>

      {/* Részleges flat-design fenyőfa a bal alsó sarokban */}
      <svg className="absolute bottom-[-10%] left-[-5%] w-32 h-40 opacity-30" viewBox="0 0 60 84">
        {/* Flat design fa rétegek */}
        <polygon points="30,8 20,24 40,24" fill="#2d8a4e"/>
        <polygon points="30,8 23,20 37,20" fill="#34a058"/>
        <polygon points="30,18 15,38 45,38" fill="#28784a"/>
        <polygon points="30,18 19,34 41,34" fill="#2d8a4e"/>
        <polygon points="30,32 10,56 50,56" fill="#236b42"/>
        <polygon points="30,32 15,52 45,52" fill="#28784a"/>
        {/* Fatörzs */}
        <rect x="25" y="54" width="10" height="9" rx="1" fill="#6b4423"/>
        {/* Díszek */}
        <circle cx="30" cy="17" r="2" fill="#FFD700" opacity="0.6"/>
        <circle cx="24" cy="30" r="1.8" fill="#dc3545" opacity="0.6"/>
        <circle cx="36" cy="30" r="1.8" fill="#FFD700" opacity="0.6"/>
        <circle cx="20" cy="45" r="2" fill="#dc3545" opacity="0.6"/>
        <circle cx="40" cy="45" r="2" fill="#FFD700" opacity="0.6"/>
      </svg>
    </div>
  )
}

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const handleOpenDay = (dayNumber: number) => {
    if (isDateUnlocked(dayNumber)) {
      setSelectedDay(dayNumber)
    }
  }

  const handleCloseModal = () => {
    setSelectedDay(null)
  }

  // 25 nap generálása
  const days = Array.from({ length: 25 }, (_, i) => i + 1)

  return (
    <div className="relative min-h-screen bg-[#1B4D3E] py-6 px-4 sm:py-8 sm:px-6 pb-24">
      <BackgroundDecorations />
      <ForegroundDecorations />
      <Snowfall />

      {/* Ünnepies fejléc */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-6 sm:mb-10"
      >
        {/* Háttér fenyőfa - flat design stílus */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
          <svg
            viewBox="0 0 200 220"
            className="w-64 h-56 sm:w-80 sm:h-72 md:w-96 md:h-80 opacity-25"
            style={{ marginTop: '-10px' }}
          >
            {/* Flat design fa rétegek */}
            {/* Felső réteg */}
            <polygon points="100,25 70,70 130,70" fill="#2d8a4e"/>
            <polygon points="100,25 78,60 122,60" fill="#34a058"/>

            {/* Középső réteg */}
            <polygon points="100,55 55,115 145,115" fill="#28784a"/>
            <polygon points="100,55 68,100 132,100" fill="#2d8a4e"/>

            {/* Alsó réteg */}
            <polygon points="100,95 35,175 165,175" fill="#236b42"/>
            <polygon points="100,95 50,160 150,160" fill="#28784a"/>

            {/* Fatörzs */}
            <rect x="85" y="172" width="30" height="28" rx="2" fill="#6b4423"/>
            <rect x="88" y="172" width="10" height="28" fill="#7d5a35" opacity="0.5"/>

            {/* Csillag a tetején */}
            <polygon
              points="100,15 104,25 115,25 107,32 110,43 100,36 90,43 93,32 85,25 96,25"
              fill="#FFD700"
            />
            <circle cx="100" cy="30" r="8" fill="#FFD700" opacity="0.4"/>

            {/* Díszek - arany és piros gömbök fényeffekttel */}
            {[
              { cx: 100, cy: 52, color: '#FFD700' },
              { cx: 82, cy: 68, color: '#dc3545' },
              { cx: 118, cy: 68, color: '#FFD700' },
              { cx: 68, cy: 95, color: '#FFD700' },
              { cx: 100, cy: 85, color: '#dc3545' },
              { cx: 132, cy: 95, color: '#FFD700' },
              { cx: 55, cy: 130, color: '#dc3545' },
              { cx: 85, cy: 120, color: '#FFD700' },
              { cx: 115, cy: 120, color: '#dc3545' },
              { cx: 145, cy: 130, color: '#FFD700' },
              { cx: 48, cy: 158, color: '#FFD700' },
              { cx: 75, cy: 150, color: '#dc3545' },
              { cx: 100, cy: 155, color: '#FFD700' },
              { cx: 125, cy: 150, color: '#dc3545' },
              { cx: 152, cy: 158, color: '#FFD700' },
            ].map((ornament, i) => (
              <g key={i}>
                {/* Glow effekt */}
                <circle
                  cx={ornament.cx}
                  cy={ornament.cy}
                  r="8"
                  fill={ornament.color}
                  opacity="0.4"
                />
                {/* Gömb */}
                <circle
                  cx={ornament.cx}
                  cy={ornament.cy}
                  r="4"
                  fill={ornament.color}
                />
                {/* Fényvisszaverődés */}
                <circle
                  cx={ornament.cx - 1}
                  cy={ornament.cy - 1}
                  r="1.5"
                  fill="white"
                  opacity="0.7"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Dekoratív csillag - ragyogó */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative text-amber-400 text-3xl sm:text-4xl mb-2"
          style={{
            textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5)'
          }}
        >
          ✦
        </motion.div>

        {/* Fejléc szöveg - meleg glow effekttel */}
        <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: `
                0 0 10px rgba(255, 200, 100, 0.9),
                0 0 20px rgba(255, 180, 80, 0.7),
                0 0 40px rgba(255, 150, 50, 0.5),
                0 0 60px rgba(255, 120, 30, 0.3),
                0 0 80px rgba(255, 100, 20, 0.2),
                2px 2px 4px rgba(0,0,0,0.4)
              `
            }}>
          Áldott adventi időszakot!
        </h1>

        {/* Dekoratív vonal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-4 h-[2px] w-40 sm:w-56 mx-auto bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
          style={{
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
          }}
        />

        {/* ForestMarkt logo (frosted glass effekttel) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-4 flex flex-col items-center"
        >
          <img
            src="/logo/ForestMarkt_banner_glass_effect.png"
            alt="ForestMarkt"
            className="h-10 sm:h-14 md:h-16 w-auto"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
            }}
          />
          <span className="mt-3 text-white/90 text-xl sm:text-2xl md:text-3xl tracking-wide"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(255,200,100,0.3)'
                }}>
            Adventi Kalendárium – 2025
          </span>
        </motion.div>

        {TEST_MODE && (
          <div className="relative mt-3 inline-block bg-yellow-500/90 text-black px-4 py-1 rounded-full text-xs font-bold">
            TESZT MÓD - Minden ablak nyitható
          </div>
        )}
      </motion.header>

      {/* Naptár rács - Responsive grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="
          relative z-10
          grid gap-2 sm:gap-3
          grid-cols-4 sm:grid-cols-5
          max-w-3xl mx-auto
        "
      >
        {days.map((dayNumber) => (
          <motion.div
            key={dayNumber}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: dayNumber * 0.02
            }}
          >
            <DayWindow
              dayNumber={dayNumber}
              isClickable={isDateUnlocked(dayNumber)}
              isSunday={isSunday(dayNumber)}
              dateLabel={formatDateLabel(dayNumber)}
              onOpen={() => handleOpenDay(dayNumber)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ForestMarkt Logo - jobb alsó sarok */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20"
      >
        <img
          src="/logo/ForestMarkt_logo_white.png"
          alt="ForestMarkt"
          className="h-12 sm:h-16 md:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg"
        />
      </motion.div>

      {/* Fotó Modal */}
      {selectedDay !== null && (
        <PhotoModal
          dayNumber={selectedDay}
          quote={adventQuotes[selectedDay - 1]}
          dateLabel={formatDateLabel(selectedDay)}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
