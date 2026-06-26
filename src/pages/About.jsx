import React from 'react';
import { motion } from 'framer-motion';

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const About = () => {
  return (
    <div className="w-full bg-[#030303] min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Page Header */}
      <div className="container mx-auto px-6 relative z-10 mb-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#A6D608]"></div>
            <span className="uppercase tracking-[0.3em] text-[#A6D608] text-sm font-bold">The Legacy</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85]">
            <span className="text-stroke text-transparent block">Born To</span>
            <span className="text-white block">Conquer</span>
          </h1>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        {/* Story Section Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-40">
          <div className="lg:col-span-5">
            <FadeUp>
              <div className="relative aspect-[3/4] rounded-none overflow-hidden group">
                <div className="absolute inset-0 bg-[#A6D608] opacity-20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
                <img 
                  src="https://images.unsplash.com/photo-1622227922682-5ceafad929da?q=80&w=2940&auto=format&fit=crop" 
                  alt="Padel Court" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#A6D608] z-0 blur-[50px] opacity-50"></div>
              </div>
            </FadeUp>
          </div>
          
          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
                A Breed <span className="text-[#A6D608]">Apart</span>
              </h2>
              <div className="space-y-8 text-gray-400 font-light text-lg lg:text-xl leading-relaxed">
                <p>
                  Lion Elite Padel Academy wasn't built to be just another club. It was forged with a singular, uncompromising vision: to create the most professional, high-performance training environment in the Middle East.
                </p>
                <p>
                  We believe that padel is a discipline that reveals character. It requires precision, power, and an unyielding mindset. Our academy brings together world-class coaching methodologies, elite-grade facilities, and a competitive atmosphere designed to push you beyond your limits.
                </p>
                <div className="pl-6 border-l-2 border-[#A6D608]">
                  <p className="text-white font-medium italic">
                    "Whether you are holding a racket for the first time or competing on the professional circuit, Lion Elite is your arena for greatness."
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Mission & Vision - Massive Overlapping Cards */}
        <div className="relative mb-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A6D608] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <FadeUp delay={0.1}>
              <div className="glass-card-premium p-12 lg:p-16 h-full flex flex-col justify-between group">
                <h3 className="text-6xl font-black mb-8 text-stroke text-transparent group-hover:text-white transition-colors duration-500 uppercase tracking-tighter">Mission</h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  To elevate the standard of padel globally by providing elite coaching, premium facilities, and a relentless development pathway that empowers individuals to dominate both on and off the court.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3} className="md:mt-24">
              <div className="glass-card-premium p-12 lg:p-16 h-full flex flex-col justify-between group bg-gradient-to-br from-[#111] to-[#050505]">
                <h3 className="text-6xl font-black mb-8 text-stroke text-transparent group-hover:text-[#A6D608] transition-colors duration-500 uppercase tracking-tighter">Vision</h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  To be the ultimate destination for padel excellence, recognized worldwide for producing elite talent, fostering an unstoppable community, and setting the absolute benchmark for academy supremacy.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Core Values - Brutalist Grid */}
        <div className="mb-20">
          <FadeUp>
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Core <span className="text-[#A6D608]">DNA</span></h2>
              <div className="flex-grow h-[1px] bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10">
            {[
              { title: "Discipline", desc: "Unwavering commitment. The foundation of every champion." },
              { title: "Confidence", desc: "Absolute self-belief forged through repetition and mastery." },
              { title: "Power", desc: "Explosive performance and tactical dominance on court." },
              { title: "Brotherhood", desc: "A fierce community united by the pursuit of excellence." }
            ].map((value, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="p-12 lg:p-16 border-r border-b border-white/10 hover:bg-[#A6D608]/5 transition-colors duration-500 group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 group-hover:text-[#A6D608]/10 transition-colors duration-500 pointer-events-none">
                    0{idx + 1}
                  </div>
                  <h4 className="text-3xl font-black text-white uppercase tracking-wider mb-4 relative z-10">{value.title}</h4>
                  <p className="text-gray-500 text-lg font-light relative z-10">{value.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
