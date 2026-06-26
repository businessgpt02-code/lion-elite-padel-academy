import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1, flag: '🇦🇪', name: 'Ahmed Al Mansoori', location: 'Dubai, UAE',
    level: 'Advanced',
    quote: 'Professional coaching, premium courts, and an incredible atmosphere. Every training session pushes me to become a better player.',
    initials: 'AA', color: '#b7ff00',
  },
  {
    id: 2, flag: '🇮🇳', name: 'Rahul Sharma', location: 'Mumbai, India',
    level: 'Intermediate',
    quote: 'I joined as a beginner and within months my confidence on court completely changed. The coaches genuinely care about every player.',
    initials: 'RS', color: '#00e5ff',
  },
  {
    id: 3, flag: '🇬🇧', name: 'James Wilson', location: 'London, United Kingdom',
    level: 'Tournament Player',
    quote: 'Exceptional facilities and world-class coaching. Easily one of the best padel academies I\'ve experienced anywhere in the world.',
    initials: 'JW', color: '#b7ff00',
  },
  {
    id: 4, flag: '🇪🇬', name: 'Omar Hassan', location: 'Cairo, Egypt',
    level: 'Advanced',
    quote: 'The attention to detail and structured training programs are outstanding. Highly recommended for any serious padel player.',
    initials: 'OH', color: '#ff9f00',
  },
  {
    id: 5, flag: '🇵🇭', name: 'Maria Santos', location: 'Manila, Philippines',
    level: 'Beginner',
    quote: 'A welcoming community, excellent coaches, and premium courts. Every single visit is an enjoyable and rewarding experience.',
    initials: 'MS', color: '#b7ff00',
  },
  {
    id: 6, flag: '🇵🇰', name: 'Ali Khan', location: 'Karachi, Pakistan',
    level: 'Intermediate',
    quote: 'Fantastic coaching methods and a motivating environment that genuinely helps players improve week after week.',
    initials: 'AK', color: '#00e5ff',
  },
  {
    id: 7, flag: '🇪🇸', name: 'Carlos Fernandez', location: 'Madrid, Spain',
    level: 'Tournament Player',
    quote: 'The quality of coaching here rivals top European academies. I was genuinely impressed from the very first session.',
    initials: 'CF', color: '#b7ff00',
  },
  {
    id: 8, flag: '🇫🇷', name: 'Sophie Laurent', location: 'Paris, France',
    level: 'Advanced',
    quote: 'A luxury sporting experience with fantastic facilities and an amazing coaching team that truly cares about your progress.',
    initials: 'SL', color: '#ff9f00',
  },
  {
    id: 9, flag: '🇩🇪', name: 'Lukas Weber', location: 'Berlin, Germany',
    level: 'Intermediate',
    quote: 'Professional from start to finish. The academy has exceeded every single expectation I had before joining.',
    initials: 'LW', color: '#b7ff00',
  },
  {
    id: 10, flag: '🇱🇧', name: 'Nour Haddad', location: 'Beirut, Lebanon',
    level: 'Beginner',
    quote: 'The perfect place to train whether you\'re a complete beginner or preparing for competitive tournaments.',
    initials: 'NH', color: '#00e5ff',
  },
];

const LEVEL_COLORS = {
  Beginner:          { bg: 'rgba(0,229,255,0.12)',   border: '#00e5ff', text: '#00e5ff' },
  Intermediate:      { bg: 'rgba(183,255,0,0.12)',   border: '#b7ff00', text: '#b7ff00' },
  Advanced:          { bg: 'rgba(255,159,0,0.12)',   border: '#ff9f00', text: '#ff9f00' },
  'Tournament Player': { bg: 'rgba(183,255,0,0.18)', border: '#b7ff00', text: '#b7ff00' },
};

/* ─────────────────────── FLOATING PARTICLES ─────────────────── */
/* ─────────────────────── COURT LINE SVG ─────────────────────── */
const CourtLines = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 700" fill="none">
    <rect x="80"  y="60"  width="1040" height="580" stroke="rgba(183,255,0,0.04)" strokeWidth="1.5" />
    <line x1="80" y1="350" x2="1120" y2="350"       stroke="rgba(183,255,0,0.03)" strokeWidth="1" />
    <line x1="600" y1="60" x2="600"  y2="640"       stroke="rgba(183,255,0,0.025)" strokeWidth="1" />
    <rect x="300" y="180" width="600" height="340"   stroke="rgba(183,255,0,0.03)" strokeWidth="1" />
    <rect x="80"  y="60"  width="1040" height="20"   fill="rgba(183,255,0,0.015)" />
    <rect x="80"  y="620" width="1040" height="20"   fill="rgba(183,255,0,0.015)" />
  </svg>
);

/* ─────────────────────── STAR RATING ─────────────────────────── */
const StarRating = ({ delay = 0 }) => (
  <motion.div className="flex items-center gap-1 mb-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div key={i} initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.3, delay: delay + i * 0.07 }}>
        <Star size={17} className="fill-[#b7ff00] text-[#b7ff00]" />
      </motion.div>
    ))}
  </motion.div>
);

/* ─────────────────────── AVATAR ──────────────────────────────── */
const Avatar = ({ initials, color }) => (
  <div className="rounded-full flex items-center justify-center font-black text-black text-lg select-none flex-shrink-0"
    style={{ width: 54, height: 54, background: color }}>
    {initials}
  </div>
);

/* ═══════════════════════ MAIN COMPONENT ══════════════════════ */
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setActive((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const next = useCallback(() => goTo(active + 1, 1),  [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[active];
  const levelStyle = LEVEL_COLORS[t.level];

  const variants = {
    enter:  (dir) => ({ opacity: 0, x: dir > 0 ?  60 : -60, scale: 0.96 }),
    center:           ({ opacity: 1, x: 0,          scale: 1   }),
    exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 :  60, scale: 0.96 }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#030303 0%,#0a0a0a 50%,#030303 100%)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Player testimonials"
    >
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <CourtLines />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(183,255,0,0.04) 0%,transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b7ff00]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b7ff00]/20 to-transparent" />
      </motion.div>

      {/* Active ambient glow */}
      <AnimatePresence>
        <motion.div
          key={`glow-${active}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ width: 600, height: 400, background: `radial-gradient(ellipse at center,${t.color}14 0%,transparent 70%)`, filter: 'blur(40px)' }}
        />
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6">

        {/* Section header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#b7ff00]" />
            <span className="text-xs font-black uppercase tracking-[0.35em]" style={{ color: '#b7ff00', textShadow: '0 0 12px #b7ff0066' }}>
              Player Experiences
            </span>
            <div className="w-8 h-px bg-[#b7ff00]" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            What Our{' '}
            <span style={{ WebkitTextStroke: '1.5px #b7ff00', color: 'transparent', filter: 'drop-shadow(0 0 12px #b7ff0055)' }}>
              Players Say
            </span>
          </h2>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto px-12 md:px-16">
          <motion.button onClick={prev} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 w-11 h-16 md:w-12 md:h-20 flex items-center justify-center bg-[#0b0b0b]/95 border border-white/10 text-white hover:text-[#b7ff00] hover:border-[#b7ff00]/50 transition-colors">
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button onClick={next} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 w-11 h-16 md:w-12 md:h-20 flex items-center justify-center bg-[#0b0b0b]/95 border border-white/10 text-white hover:text-[#b7ff00] hover:border-[#b7ff00]/50 transition-colors">
            <ChevronRight size={24} />
          </motion.button>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#080808] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b7ff00]/70 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-1 bg-[#b7ff00]" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 grid grid-cols-[0.8fr_1.4fr] gap-6 px-5 py-8 md:gap-10 md:px-14 md:py-14"
              >
                <div className="flex flex-col justify-between border-r border-white/10 pr-5 md:pr-10">
                  <div>
                    <p className="mb-5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.35em] text-[#b7ff00]">Verified Review</p>
                    <Avatar initials={t.initials} color={t.color} />
                  </div>
                  <div className="mt-8">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm md:text-xl font-black text-white">{t.name}</span>
                      <span className="text-base md:text-xl">{t.flag}</span>
                    </div>
                    <p className="mb-4 text-xs md:text-sm text-gray-500">{t.location}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(183,255,0,0.1)', border: '1px solid rgba(183,255,0,0.25)', color: '#b7ff00' }}>
                        <ShieldCheck size={10} /> Verified Player
                      </span>
                      <span className="inline-flex items-center text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: levelStyle.bg, border: `1px solid ${levelStyle.border}44`, color: levelStyle.text }}>
                        {t.level}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <StarRating delay={0.1} />
                  <blockquote>
                    <p className="text-lg font-light leading-tight text-white md:text-3xl lg:text-4xl">
                      "{t.quote}"
                    </p>
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => goTo(i, i > active ? 1 : -1)} aria-label={`Testimonial ${i + 1}`}
                  className="relative overflow-hidden rounded-full transition-all duration-500"
                  style={{ width: i === active ? 28 : 8, height: 8, background: i === active ? '#b7ff00' : 'rgba(255,255,255,0.15)', boxShadow: i === active ? '0 0 10px #b7ff0088' : 'none' }}>
                  {i === active && (
                    <motion.div className="absolute inset-0 rounded-full" style={{ background: '#b7ff00', originX: 0 }}
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 6, ease: 'linear' }} key={`p-${active}`} />
                  )}
                </button>
              ))}
          </div>

          {/* Slide counter */}
          <p className="text-center mt-5 text-xs text-gray-600 tracking-[0.2em] uppercase font-bold">
            {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
