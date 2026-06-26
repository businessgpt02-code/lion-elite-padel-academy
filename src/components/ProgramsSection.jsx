import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutGrid, Zap, Star, Target, Users, Activity, Trophy,
  ArrowRight, CheckCircle2,
} from 'lucide-react';

const EXPERIENCES = [
  {
    num: '01', icon: LayoutGrid,
    title: 'Premium Court Reservations',
    tag: 'Indoor Padel Courts UAE',
    slug: 'premium-indoor-padel-court-reservations-dubai',
    desc: 'Reserve tournament-quality indoor padel courts featuring professional playing surfaces, LED lighting, premium amenities, and flexible booking options for casual, competitive, and corporate sessions.',
    highlights: ['Tournament-Grade Courts', 'Flexible Booking Slots'],
    cta: 'Reserve Court', color: '#A6D608',
  },
  {
    num: '02', icon: Zap,
    title: 'Elite Adult Coaching',
    tag: 'Professional Padel Coaching',
    slug: 'professional-adult-padel-coaching-dubai',
    desc: 'Develop your technique, tactical awareness, and match performance through structured coaching programs led by certified coaches for beginners, intermediate players, and advanced competitors.',
    highlights: ['50+ Certified Coaches', 'All Skill Levels'],
    cta: 'Start Training', color: '#A6D608',
  },
  {
    num: '03', icon: Star,
    title: 'Future Champions Academy',
    tag: 'Junior Padel Academy Dubai',
    slug: 'junior-padel-academy-dubai',
    desc: 'Build confidence, discipline, and technical excellence through age-specific junior programs designed to inspire the next generation of padel players across Dubai and the UAE.',
    highlights: ['Ages 6-17', '200+ Junior Players'],
    cta: 'Join Academy', color: '#A6D608',
  },
  {
    num: '04', icon: Target,
    title: 'Private Performance Coaching',
    tag: 'Private Padel Lessons Dubai',
    slug: 'private-padel-lessons-dubai',
    desc: 'Experience personalized one-to-one coaching with tailored training plans, performance analysis, technical refinement, and tactical development focused entirely on your goals.',
    highlights: ['100% Individual Focus', 'Performance Tracking'],
    cta: 'Book Session', color: '#A6D608',
  },
  {
    num: '05', icon: Users,
    title: 'Partner Performance Sessions',
    tag: 'Padel Partner Training UAE',
    slug: 'partner-padel-training-dubai-uae',
    desc: 'Train alongside a partner while receiving expert coaching focused on teamwork, communication, positioning, movement, and advanced match strategy.',
    highlights: ['2 Players Per Coach', 'Tactical Game Development'],
    cta: 'Train Together', color: '#A6D608',
  },
  {
    num: '06', icon: Activity,
    title: 'High-Performance Group Training',
    tag: 'Group Padel Training Dubai',
    slug: 'group-padel-training-dubai',
    desc: 'Join dynamic group sessions combining competitive drills, fitness, teamwork, and tactical coaching in a motivating environment led by experienced professional coaches.',
    highlights: ['4-6 Players', 'Competitive Environment'],
    cta: 'Join Group', color: '#A6D608',
  },
  {
    num: '07', icon: Trophy,
    title: 'Competitive Events & Community',
    tag: 'Padel Tournaments Dubai',
    slug: 'padel-tournaments-events-dubai',
    desc: "Become part of Dubai's thriving padel community through tournaments, social games, leagues, ladders, networking events, and academy competitions open to all levels.",
    highlights: ['500+ Monthly Matches', 'Active Community'],
    cta: 'View Events', color: '#A6D608',
  },
];

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

const ctaStyle = {
  pointerEvents: 'auto',
  cursor: 'pointer',
};

const ExperienceRow = ({ exp, index }) => {
  const Icon = exp.icon;
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      id={exp.slug}
      itemScope
      itemType="https://schema.org/Service"
      className="group relative overflow-hidden border-y border-white/10"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`grid min-h-[620px] items-stretch lg:grid-cols-2 ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative min-h-[360px] overflow-hidden">
          <img
            src={getExperienceImage(exp)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
          />
          <div className={`absolute inset-0 ${isReversed ? 'lg:bg-gradient-to-l' : 'lg:bg-gradient-to-r'} bg-gradient-to-t from-black via-black/22 to-transparent lg:from-transparent lg:via-black/14 lg:to-black/82`} />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(166,214,8,0.18),transparent_38%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <span className="text-8xl font-black leading-none text-white/10 md:text-9xl">{exp.num}</span>
            <div className="hidden h-px w-28 bg-[#A6D608]/60 md:block" />
          </div>
        </div>

        <div className="relative flex items-center bg-[#050505] px-6 py-12 md:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:74px_74px] opacity-30" />
          <div className="relative max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-[#A6D608] text-black shadow-[0_0_40px_rgba(166,214,8,0.22)]">
                <Icon size={26} />
              </div>
              <div>
                <p itemProp="serviceType" className="text-xs font-black uppercase tracking-[0.3em] text-[#A6D608]">
                  {exp.tag}
                </p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/30">
                  Lion Elite Padel Academy Middle East
                </p>
              </div>
            </div>

            <h3 itemProp="name" className="mb-7 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-5xl xl:text-6xl">
              {exp.title}
            </h3>

            <p itemProp="description" className="mb-9 max-w-xl text-base font-light leading-relaxed text-white/68 md:text-lg">
              {exp.desc}
            </p>

            <div className="mb-10 grid gap-3 sm:grid-cols-2">
              {exp.highlights.map((highlight) => (
                <div key={highlight} className="flex min-h-14 items-center gap-3 border border-white/10 bg-white/[0.035] px-4 py-3">
                  <CheckCircle2 size={17} className="shrink-0 text-[#A6D608]" />
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-white/78">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              itemProp="url"
              className="group/link inline-flex items-center gap-3 bg-[#A6D608] px-8 py-4 text-xs font-black uppercase tracking-[0.24em] text-black transition-colors duration-300 hover:bg-white"
              style={ctaStyle}
            >
              <span>{exp.cta}</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProgramsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '5%']);

  return (
    <section
      id="padel-experiences"
      ref={sectionRef}
      className="relative overflow-hidden pt-10 pb-8 md:pt-14 md:pb-10"
      style={{ background: 'linear-gradient(180deg, #030303 0%, #080808 45%, #030303 100%)' }}
      aria-labelledby="padel-experiences-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experiencesSchema) }}
      />

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-[#A6D608]/35 to-transparent" />
        <div className="absolute bottom-28 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6">
        <div ref={headingRef} className="mb-8 grid gap-8 lg:grid-cols-[0.95fr_0.65fr] lg:items-end">
          <div>
            <motion.div
              className="mb-5 inline-flex items-center gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="h-px w-10 bg-[#A6D608]" />
              <span className="text-xs font-black uppercase tracking-[0.35em] text-[#A6D608]">
                Our Padel Experiences
              </span>
            </motion.div>

            <motion.h2
              id="padel-experiences-heading"
              className="max-w-4xl text-4xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 28 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Padel Experiences in Dubai to <span className="text-[#A6D608]">Elevate Your Game</span>
            </motion.h2>
          </div>

          <motion.p
            className="max-w-md text-sm font-light leading-relaxed text-white/52 md:text-base lg:justify-self-end"
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            From elite coaching to premium courts - a complete padel experience for every player.
          </motion.p>
        </div>

      </div>

      <div className="relative z-10 mt-4">
        {EXPERIENCES.map((exp, index) => (
          <ExperienceRow key={exp.num} exp={exp} index={index} />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/38">
            Ready to get on court?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-black transition-colors duration-300 hover:bg-[#A6D608]"
            style={ctaStyle}
          >
            <span>Book Your Experience</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
