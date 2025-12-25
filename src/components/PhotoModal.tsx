import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PhotoModalProps {
  dayNumber: number
  quote: string
  dateLabel: string
  photoPath?: string  // Opcionális custom path (pl. /newyear/1.jpg)
  onClose: () => void
}

export default function PhotoModal({
  dayNumber,
  quote,
  dateLabel,
  photoPath,
  onClose
}: PhotoModalProps) {
  // ESC gomb kezelése
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${dayNumber}. nap - ${dateLabel}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-[#FAF3E0] rounded-xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bezárás gomb */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[#8B4545]/90 text-white flex items-center justify-center hover:bg-[#8B4545] transition-colors shadow-lg"
            aria-label="Bezárás"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Dátum és nap szám */}
          <div className="absolute top-3 left-3 z-10 bg-[#D4AF37]/95 text-white px-4 py-1.5 rounded-full shadow-lg">
            <span className="font-bold">{dayNumber}. nap</span>
            <span className="mx-2">–</span>
            <span className="capitalize">{dateLabel}</span>
          </div>

          {/* Fénykép - object-contain, hogy ne vágja le */}
          <div className="flex-1 min-h-0 bg-[#2C3E50] flex items-center justify-center p-4 pt-14">
            <img
              src={photoPath || `/photos/${dayNumber}.jpg`}
              alt={`${dayNumber}. nap fotója`}
              className="max-w-full max-h-[60vh] object-contain rounded shadow-xl"
              onError={(e) => {
                e.currentTarget.src = '/photos/placeholder.jpg'
              }}
            />
          </div>

          {/* Idézet */}
          <div className="p-5 sm:p-6 text-center bg-[#FAF3E0]">
            <blockquote className="text-base sm:text-lg text-[#8B4545] italic leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              „{quote}"
            </blockquote>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
