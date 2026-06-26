import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import StatsSection from '../components/StatsSection';
import ProgramsSection from '../components/ProgramsSection';

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="w-full bg-[#030303]" ref={containerRef}>
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[120vh] flex flex-col justify-center overflow-hidden pt-32 pb-32">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yBackground, opacity: opacityBackground }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-black/50 z-10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-[#030303] z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.1)_0%,transparent_50%)] z-10"></div>
          <img 
            src="/hero.png" 
            alt="Professional padel tennis training session at Lion Elite Padel Academy Middle East" 
            className="w-full h-full object-cover object-[85%_center] md:object-center scale-105"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-6 mt-8">
              <div className="w-12 h-[1px] bg-[#ccff00]"></div>
              <span className="uppercase tracking-[0.3em] text-[#ccff00] text-sm font-bold">#1 Professional Padel Academy in Dubai &amp; UAE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter uppercase">
              <span className="sr-only">Lion Elite Padel Academy — Professional Padel Coaching &amp; Premium Courts in Dubai &amp; UAE</span>
              <span className="block text-white">Elite Padel</span>
              <span className="block text-white">Dubai &amp; UAE</span>
            </h1>

            <div className="flex flex-col items-start gap-6 mt-8 pl-2">
              <p className="text-gray-400 max-w-sm text-base font-light leading-relaxed">
                Professional padel coaching, private training, junior development programs, and premium indoor courts across the UAE. Whether you're a beginner or a competitive player, our certified coaches help you dominate the game.
              </p>
              
              <Link 
                to="/contact" 
                aria-label="Book your first padel session at Lion Elite Padel Academy Dubai"
                className="relative inline-flex items-center justify-center px-10 py-5 font-bold tracking-widest uppercase text-black bg-[#ccff00] overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-3">
                  Book Your First Session <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>


      </section>

      {/* Programs & Experiences */}
      <ProgramsSection />

      {/* Stats */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Massive CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/CTA.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeUp>
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.35em] text-[#ccff00] mb-3">
              READY TO PLAY?
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-5">
              Train at Dubai's Leading Padel Academy
            </h2>
            <p className="mx-auto mb-7 max-w-3xl text-base md:text-lg font-medium leading-relaxed text-white/80">
              Take your game to the next level with professional padel coaching, premium indoor courts, private lessons, junior academy programs, and competitive training designed for players of every skill level across Dubai and the UAE.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-10 py-5 font-black tracking-[0.18em] uppercase text-black bg-white hover:bg-[#ccff00] transition-all duration-500 overflow-hidden group rounded-none">
                <span className="relative z-10 flex items-center gap-4 text-sm md:text-base">
                  Book Your Padel Session <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform duration-300" />
                </span>
              </Link>
              <Link to="/courts" className="inline-flex items-center justify-center px-10 py-5 font-black tracking-[0.18em] uppercase text-black bg-white hover:bg-[#ccff00] transition-all duration-500 overflow-hidden group rounded-none">
                <span className="relative z-10 flex items-center gap-4 text-sm md:text-base">
                  Explore Our Coaching Programs <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};

export default Home;
