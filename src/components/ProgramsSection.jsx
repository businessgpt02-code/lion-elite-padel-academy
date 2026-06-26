import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutGrid, Zap, Star, Target, Users, Activity, Trophy,
  ArrowRight, CheckCircle2, Plus, Minus,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */
const EXPERIENCES = [
  {
    num: '01', icon: LayoutGrid,
    title: 'Premium Court Reservations',
    tag: 'Indoor Padel Courts UAE',
    slug: 'premium-indoor-padel-court-reservations-dubai',
    desc: 'Reserve tournament-quality indoor padel courts featuring professional playing surfaces, LED lighting, premium amenities, and flexible booking options for casual, competitive, and corporate sessions.',
    highlights: ['Tournament-Grade Courts', 'Flexible Booking Slots'],
    cta: 'Reserve Court', color: '#b7ff00',
  },
  {
    num: '02', icon: Zap,
    title: 'Elite Adult Coaching',
    tag: 'Professional Padel Coaching',
    slug: 'professional-adult-padel-coaching-dubai',
    desc: 'Develop your technique, tactical awareness, and match performance through structured coaching programs led by certified coaches for beginners, intermediate players, and advanced competitors.',
    highlights: ['50+ Certified Coaches', 'All Skill Levels'],
    cta: 'Start Training', color: '#b7ff00',
  },
  {
    num: '03', icon: Star,
    title: 'Future Champions Academy',
    tag: 'Junior Padel Academy Dubai',
    slug: 'junior-padel-academy-dubai',
    desc: 'Build confidence, discipline, and technical excellence through age-specific junior programs designed to inspire the next generation of padel players across Dubai and the UAE.',
    highlights: ['Ages 6–17', '200+ Junior Players'],
    cta: 'Join Academy', color: '#b7ff00',
  },
  {
    num: '04', icon: Target,
    title: 'Private Performance Coaching',
    tag: 'Private Padel Lessons Dubai',
    slug: 'private-padel-lessons-dubai',
    desc: 'Experience personalized one-to-one coaching with tailored training plans, performance analysis, technical refinement, and tactical development focused entirely on your goals.',
    highlights: ['100% Individual Focus', 'Performance Tracking'],
    cta: 'Book Session', color: '#b7ff00',
  },
  {
    num: '05', icon: Users,
    title: 'Partner Performance Sessions',
    tag: 'Padel Partner Training UAE',
    slug: 'partner-padel-training-dubai-uae',
    desc: 'Train alongside a partner while receiving expert coaching focused on teamwork, communication, positioning, movement, and advanced match strategy.',
    highlights: ['2 Players Per Coach', 'Tactical Game Development'],
    cta: 'Train Together', color: '#b7ff00',
  },
  {
    num: '06', icon: Activity,
    title: 'High-Performance Group Training',
    tag: 'Group Padel Training Dubai',
    slug: 'group-padel-training-dubai',
    desc: 'Join dynamic group sessions combining competitive drills, fitness, teamwork, and tactical coaching in a motivating environment led by experienced professional coaches.',
    highlights: ['4–6 Players', 'Competitive Environment'],
    cta: 'Join Group', color: '#b7ff00',
  },
  {
    num: '07', icon: Trophy,
    title: 'Competitive Events & Community',
    tag: 'Padel Tournaments Dubai',
    slug: 'padel-tournaments-events-dubai',
    desc: "Become part of Dubai's thriving padel community through tournaments, social games, leagues, ladders, networking events, and academy competitions open to all levels.",
    highlights: ['500+ Monthly Matches', 'Active Community'],
    cta: 'View Events', color: '#b7ff00',
  },
];

const INTERVAL = 6000;
const SITE_URL = 'https://lionelitepadel.com';
const getExperienceImage = (exp) => `/experience/${Number(exp.num)}.png`;

const EXPERIENCE_FAQS = [
  {
    question: 'What padel experiences does Lion Elite Padel Academy offer in Dubai?',
    answer: 'Lion Elite Padel Academy offers premium court reservations, adult padel coaching, junior academy programs, private lessons, partner training, group sessions, tournaments, and community events in Dubai and across the UAE.',
  },
  {
    question: 'Can beginners join the padel coaching programs?',
    answer: 'Yes. The academy supports beginners, intermediate players, advanced players, juniors, adults, private clients, partner pairs, and competitive groups with structured coaching pathways.',
  },
  {
    question: 'Do you offer private and group padel lessons in Dubai?',
    answer: 'Yes. Players can book one-to-one private performance coaching, two-player partner sessions, and high-performance group training led by professional coaches.',
  },
];

const experiencesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#padel-experiences`,
      name: 'Our Padel Experiences in Dubai and UAE',
      description: 'Structured padel experiences at Lion Elite Padel Academy, including court reservations, coaching, private lessons, junior academy programs, tournaments, and group training.',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: EXPERIENCES.length,
      itemListElement: EXPERIENCES.map((exp, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/#${exp.slug}`,
        name: exp.title,
        description: exp.desc,
      })),
    },
    ...EXPERIENCES.map((exp) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#${exp.slug}`,
      name: `${exp.title} - ${exp.tag}`,
      serviceType: exp.tag,
      description: exp.desc,
      provider: {
        '@id': `${SITE_URL}/#academy`,
        '@type': 'SportsActivityLocation',
        name: 'Lion Elite Padel Academy',
      },
      areaServed: [
        { '@type': 'City', name: 'Dubai' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      category: 'Padel coaching, court reservations, and academy programs',
      url: `${SITE_URL}/#${exp.slug}`,
    })),
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#padel-experiences-faq`,
      mainEntity: EXPERIENCE_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

/* ─────────────── DIAGONAL STRIPE BACKGROUND ─────────────── */
const DiagonalStripes = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1400 800">
    {Array.from({ length: 20 }).map((_, i) => (
      <line
        key={i}
        x1={i * 100 - 200} y1="0"
        x2={i * 100 + 400} y2="800"
        stroke="rgba(183,255,0,0.018)" strokeWidth="1"
      />
    ))}
    {/* Corner brackets */}
    <path d="M40 40 L40 90 M40 40 L90 40" stroke="rgba(183,255,0,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1360 40 L1360 90 M1360 40 L1310 40" stroke="rgba(183,255,0,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M40 760 L40 710 M40 760 L90 760" stroke="rgba(183,255,0,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1360 760 L1360 710 M1360 760 L1310 760" stroke="rgba(183,255,0,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ────────────────── LEFT TAB ITEM ──────────────────────── */
const TabItem = ({ exp, isActive, onClick, progress }) => {
  const Icon = exp.icon;
  return (
    <button
      onClick={onClick}
      className="w-full text-left group relative overflow-hidden transition-all duration-500 outline-none"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: isActive ? 'rgba(183,255,0,0.04)' : 'transparent',
      }}
      aria-label={exp.title}
    >
      {/* Active left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
        style={{ background: isActive ? '#b7ff00' : 'transparent', boxShadow: isActive ? '0 0 12px #b7ff00' : 'none' }}
      />

      <div className="flex items-center gap-4 px-6 py-5">
        {/* Number */}
        <span
          className="font-black text-xs tracking-widest flex-shrink-0 transition-colors duration-300 w-6"
          style={{ color: isActive ? '#b7ff00' : 'rgba(255,255,255,0.2)' }}
        >
          {exp.num}
        </span>

        {/* Icon */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-400"
          style={{
            background: isActive ? 'rgba(183,255,0,0.12)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${isActive ? 'rgba(183,255,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          <Icon size={15} style={{ color: isActive ? '#b7ff00' : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }} />
        </div>

        {/* Title */}
        <span
          className="text-xs font-bold uppercase tracking-wider leading-tight flex-1 transition-colors duration-300 text-left"
          style={{ color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)' }}
        >
          {exp.title}
        </span>

        {/* Arrow */}
        <ArrowRight
          size={12}
          className="flex-shrink-0 transition-all duration-300"
          style={{
            color: isActive ? '#b7ff00' : 'transparent',
            transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
          }}
        />
      </div>

      {/* Progress bar */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(183,255,0,0.08)' }}>
          <motion.div
            className="h-full"
            style={{ background: '#b7ff00', boxShadow: '0 0 8px #b7ff00' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0 }}
          />
        </div>
      )}
    </button>
  );
};

/* ─────────────────── RIGHT CONTENT PANEL ───────────────── */
const ContentPanel = ({ exp }) => {
  const Icon = exp.icon;

  const variants = {
    enter:  { opacity: 0, y: 30, scale: 0.98 },
    center: { opacity: 1, y: 0,  scale: 1    },
    exit:   { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        id={exp.slug}
        itemScope
        itemType="https://schema.org/Service"
        key={exp.num}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full rounded-2xl overflow-hidden flex flex-col justify-between"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.92) 100%), url(${getExperienceImage(exp)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid rgba(183,255,0,0.12)',
          backdropFilter: 'blur(20px)',
          minHeight: 520,
        }}
      >
        {/* Giant watermark number */}
        <div
          className="absolute right-0 bottom-0 leading-none select-none pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{
            fontSize: '22rem',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(183,255,0,0.06)',
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
          }}
        >
          {exp.num}
        </div>

        {/* Diagonal accent stripe */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(183,255,0,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-10 md:p-14 flex flex-col h-full justify-between">
          <div>
            {/* Top row: icon + tag */}
            <div className="flex items-center gap-5 mb-8">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(183,255,0,0.1)',
                  border: '1px solid rgba(183,255,0,0.25)',
                  boxShadow: '0 0 30px rgba(183,255,0,0.15)',
                }}
              >
                <Icon size={30} style={{ color: '#b7ff00', filter: 'drop-shadow(0 0 8px #b7ff0088)' }} />
              </motion.div>

              <div>
                <span
                  itemProp="serviceType"
                  className="text-xs font-black uppercase tracking-[0.3em] block mb-1"
                  style={{ color: '#b7ff00', textShadow: '0 0 10px rgba(183,255,0,0.4)' }}
                >
                  {exp.tag}
                </span>
                <span className="text-xs text-gray-600 uppercase tracking-widest font-bold">
                  Lion Elite Padel Academy Dubai
                </span>
              </div>
            </div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none mb-6"
              itemProp="name"
            >
              {exp.title}
            </motion.h3>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 h-px origin-left"
              style={{ background: 'linear-gradient(90deg, #b7ff00, rgba(183,255,0,0.2), transparent)' }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-gray-400 leading-relaxed text-base font-light mb-8 max-w-xl"
              itemProp="description"
            >
              {exp.desc}
            </motion.p>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {exp.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(183,255,0,0.07)',
                    border: '1px solid rgba(183,255,0,0.18)',
                  }}
                >
                  <CheckCircle2 size={12} style={{ color: '#b7ff00' }} />
                  <span className="text-xs font-black uppercase tracking-wider text-white/80">{h}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            <Link
              to="/contact"
              itemProp="url"
              className="inline-flex items-center gap-3 group/cta relative overflow-hidden px-8 py-4 font-black text-xs uppercase tracking-[0.25em] text-black"
              style={{ background: '#b7ff00', boxShadow: '0 0 30px rgba(183,255,0,0.25)' }}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover/cta:opacity-20 transition-opacity duration-300" />
              <span className="relative">{exp.cta}</span>
              <ArrowRight size={14} className="relative group-hover/cta:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom decorative bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(183,255,0,0.2), transparent)' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────── MOBILE ACCORDION ITEM ─────────────── */
const AccordionItem = ({ exp, isOpen, onClick }) => {
  const Icon = exp.icon;
  return (
    <div
      id={`mobile-${exp.slug}`}
      itemScope
      itemType="https://schema.org/Service"
      className="overflow-hidden rounded-xl transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,${isOpen ? 0.86 : 0.78}) 0%, rgba(0,0,0,0.9) 100%), url(${getExperienceImage(exp)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: `1px solid ${isOpen ? 'rgba(183,255,0,0.2)' : 'rgba(255,255,255,0.06)'}`,
        marginBottom: 8,
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 text-left outline-none"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-black tracking-widest" style={{ color: '#b7ff00' }}>{exp.num}</span>
          <Icon size={16} style={{ color: isOpen ? '#b7ff00' : 'rgba(255,255,255,0.4)' }} />
          <span className="text-sm font-black uppercase tracking-wide text-white/80" itemProp="name">{exp.title}</span>
        </div>
        {isOpen
          ? <Minus size={14} style={{ color: '#b7ff00', flexShrink: 0 }} />
          : <Plus size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
        }
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-6">
              <p className="text-gray-400 text-sm leading-relaxed mb-4" itemProp="description">{exp.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {exp.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(183,255,0,0.07)', border: '1px solid rgba(183,255,0,0.18)' }}>
                    <CheckCircle2 size={10} style={{ color: '#b7ff00' }} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/70">{h}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact"
                itemProp="url"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-black"
                style={{ background: '#b7ff00' }}>
                {exp.cta} <ArrowRight size={11} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ══════════════════════ MAIN SECTION ══════════════════════ */
const ProgramsSection = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const lastTickRef = useRef(null);
  const rafRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  /* Smooth RAF-based progress */
  const tick = useCallback((timestamp) => {
    if (!lastTickRef.current) lastTickRef.current = timestamp;
    const delta = timestamp - lastTickRef.current;
    lastTickRef.current = timestamp;

    progressRef.current = Math.min(progressRef.current + (delta / INTERVAL) * 100, 100);
    setProgress(progressRef.current);

    if (progressRef.current >= 100) {
      progressRef.current = 0;
      setActive((prev) => (prev + 1) % EXPERIENCES.length);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); lastTickRef.current = null; return; }
    progressRef.current = 0;
    setProgress(0);
    lastTickRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, paused, tick]);

  const handleTabClick = (i) => {
    progressRef.current = 0;
    setProgress(0);
    lastTickRef.current = null;
    setActive(i);
  };

  return (
    <section
      id="padel-experiences"
      ref={sectionRef}
      className="relative overflow-hidden pt-2 pb-8"
      style={{ background: 'linear-gradient(160deg, #020202 0%, #060606 40%, #040404 70%, #020202 100%)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-labelledby="padel-experiences-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experiencesSchema) }}
      />
      {/* ── BG ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <DiagonalStripes />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(183,255,0,0.03) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 2 + (i % 3), height: 2 + (i % 3), left: `${(i * 23 + 7) % 95}%`, top: `${(i * 19 + 5) % 90}%`, background: i % 2 === 0 ? '#b7ff00' : '#fff', opacity: 0.07 }}
            animate={{ y: [0, -35, 0], opacity: [0.07, 0.22, 0.07] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">

        {/* ── Header ── */}
        <div ref={headingRef} className="mb-16 max-w-2xl">
          <motion.div className="inline-flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-8 h-px bg-[#b7ff00]" />
            <span className="text-xs font-black uppercase tracking-[0.35em]" style={{ color: '#b7ff00', textShadow: '0 0 12px #b7ff0055' }}>
              Our Padel Experiences
            </span>
          </motion.div>

          <motion.h2
            id="padel-experiences-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.9] mb-5"
            initial={{ opacity: 0, y: 30 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            Padel Experiences in Dubai to{' '}
            <span style={{ WebkitTextStroke: '1.5px #b7ff00', color: 'transparent', filter: 'drop-shadow(0 0 12px #b7ff0044)' }}>
              Elevate Your Game
            </span>
          </motion.h2>

          <motion.p className="text-gray-500 text-sm leading-relaxed"
            initial={{ opacity: 0 }} animate={headingInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.25 }}>
            From elite coaching to premium courts — a complete padel experience for every player.
          </motion.p>
        </div>

        {/* ── DESKTOP: Split layout ── */}
        <ol className="sr-only" aria-label="Complete list of padel services in Dubai and UAE">
          {EXPERIENCES.map((exp) => (
            <li key={`seo-${exp.num}`}>
              <h3>{`${exp.title}: ${exp.tag}`}</h3>
              <p>{exp.desc}</p>
            </li>
          ))}
        </ol>

        <div className="hidden lg:grid grid-cols-[380px_1fr] gap-6 items-stretch">

          {/* Left tab list */}
          <div className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {EXPERIENCES.map((exp, i) => (
              <TabItem key={exp.num} exp={exp} isActive={active === i} onClick={() => handleTabClick(i)}
                progress={active === i ? progress : 0} />
            ))}
          </div>

          {/* Right content */}
          <ContentPanel exp={EXPERIENCES[active]} />
        </div>

        {/* ── MOBILE: Accordion ── */}
        <div className="lg:hidden">
          {EXPERIENCES.map((exp, i) => (
            <AccordionItem key={exp.num} exp={exp} isOpen={openAccordion === i}
              onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-gray-600 text-xs uppercase tracking-[0.3em] font-bold mb-5">Ready to get on court?</p>
          <Link to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 font-black text-xs uppercase tracking-[0.25em] text-black group"
            style={{ background: '#b7ff00', boxShadow: '0 0 40px rgba(183,255,0,0.25)' }}>
            <span>Book Your Experience</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ProgramsSection;

