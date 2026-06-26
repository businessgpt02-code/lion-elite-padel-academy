import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─────────────────────── DATA ─────────────────────── */
const STATS = [
  { value: 500, suffix: '+', label: 'Players Trained',    sub: 'And growing',          delay: 0    },
  { value: 4,   suffix: '',  label: 'Premium Courts',     sub: 'Indoor UAE',            delay: 0.08 },
  { value: 98,  suffix: '%', label: 'Satisfaction Rate',  sub: 'Verified feedback',     delay: 0.16 },
  { value: 12,  suffix: '+', label: 'Certified Coaches',  sub: 'International staff',   delay: 0.24 },
  { value: 3,   suffix: '+', label: 'Years Excellence',   sub: "Dubai's most trusted",  delay: 0.32 },
  { value: 30,  suffix: '+', label: 'Nationalities',      sub: 'Representing the world',delay: 0.40 },
];

/* ─────────────── ANIMATED COUNTER HOOK ─────────────── */
const useCounter = (target, duration = 1800, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
};

/* ──────────────────── SINGLE STAT ──────────────────── */
const Stat = ({ value, suffix, label, sub, delay, isLast, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCounter(value, 1600, inView);
  const [hovered, setHovered] = useState(false);

  /* Alternate: even stats label on top, odd on bottom */
  const labelOnTop = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex-1 flex flex-col items-center justify-center group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top label slot */}
      <div className="h-12 flex flex-col items-center justify-end mb-4">
        {labelOnTop && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            className="text-center"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 leading-none">{label}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600 mt-0.5">{sub}</p>
          </motion.div>
        )}
      </div>

      {/* The number */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-end leading-none tabular-nums select-none"
      >
        <span
          className="font-black transition-all duration-400"
          style={{
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            color: '#A6D608',
            textShadow: hovered
              ? '0 0 40px rgba(166,214,8,0.7), 0 0 80px rgba(166,214,8,0.3)'
              : '0 0 20px rgba(166,214,8,0.35)',
            letterSpacing: '-0.03em',
          }}
        >
          {count}
        </span>
        <span
          className="font-black pb-2 transition-all duration-400"
          style={{
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            color: '#A6D608',
            textShadow: hovered
              ? '0 0 30px rgba(166,214,8,0.7)'
              : '0 0 14px rgba(166,214,8,0.35)',
          }}
        >
          {suffix}
        </span>
      </motion.div>

      {/* Bottom label slot */}
      <div className="h-12 flex flex-col items-center justify-start mt-4">
        {!labelOnTop && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            className="text-center"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 leading-none">{label}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600 mt-0.5">{sub}</p>
          </motion.div>
        )}
      </div>

      {/* Vertical divider (between stats) */}
      {!isLast && (
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-px"
          style={{ height: '60%' }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.2 }}
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(166,214,8,0.3) 30%, rgba(166,214,8,0.3) 70%, transparent 100%)',
              boxShadow: '0 0 8px rgba(166,214,8,0.15)',
            }}
          />
        </motion.div>
      )}

      {/* Hover ground glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-none"
        style={{
          width: hovered ? 120 : 0,
          height: 1,
          background: '#A6D608',
          boxShadow: hovered ? '0 0 20px 4px rgba(166,214,8,0.4)' : 'none',
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
};

/* ══════════════════ MAIN SECTION ══════════════════════ */
const StatsSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-40px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#030303', padding: '2rem 0 1.5rem' }}
    >
      {/* Parallax BG wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(166,214,8,0.03) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">

        {/* ── Top edge line (draws in) ── */}
        <div ref={lineRef} className="relative mb-12 overflow-hidden h-px">
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(166,214,8,0.5) 20%, rgba(166,214,8,0.5) 80%, transparent 100%)', boxShadow: '0 0 12px rgba(166,214,8,0.25)' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* ── Section eyebrow ── */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={lineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span
            className="text-[10px] font-black uppercase tracking-[0.4em]"
            style={{ color: '#A6D608', textShadow: '0 0 10px rgba(166,214,8,0.4)' }}
          >
            By The Numbers
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(166,214,8,0.1)' }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
            Lion Elite Padel Academy · Dubai UAE
          </span>
        </motion.div>

        {/* ── STATS ROW (desktop) ── */}
        <div className="hidden md:flex items-stretch">
          {STATS.map((s, i) => (
            <Stat
              key={s.label}
              {...s}
              index={i}
              isLast={i === STATS.length - 1}
            />
          ))}
        </div>

        {/* ── STATS GRID (mobile: 2 cols) ── */}
        <div className="md:hidden grid grid-cols-2 gap-y-10 gap-x-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: s.delay }}
            >
              <span
                className="font-black leading-none tabular-nums"
                style={{ fontSize: '3.5rem', color: '#A6D608', textShadow: '0 0 20px rgba(166,214,8,0.4)', letterSpacing: '-0.03em' }}
              >
                {s.value}{s.suffix}
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70 mt-2">{s.label}</p>
              <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom edge line ── */}
        <div className="relative mt-8 overflow-hidden h-px">
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(166,214,8,0.5) 20%, rgba(166,214,8,0.5) 80%, transparent 100%)', boxShadow: '0 0 12px rgba(166,214,8,0.25)' }}
            initial={{ scaleX: 0, originX: 1 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* ── Scrolling keyword marquee ── */}
        <div className="mt-6 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #030303, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #030303, transparent)' }} />
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 2 }).flatMap(() =>
              ['Padel Academy Dubai', 'Professional Coaching', 'Premium Courts UAE', 'Junior Academy', 'Private Lessons', 'Group Training', 'Tournaments Dubai', '🏆 Lion Elite', 'Indoor Padel UAE', 'Elite Coaching'].map((item, i) => (
                <span key={`${item}-${i}`} className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-6"
                  style={{ color: 'rgba(166,214,8,0.25)' }}>
                  {item}
                  <span style={{ color: 'rgba(166,214,8,0.1)', fontSize: '6px' }}>◆</span>
                </span>
              ))
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;

