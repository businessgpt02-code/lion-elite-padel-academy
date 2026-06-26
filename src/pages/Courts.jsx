import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Crosshair, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const CourtCard = ({ title, tag, desc, image, icon: Icon, features, delay }) => (
  <FadeUp delay={delay}>
    <div className="glass-card-premium rounded-none h-full flex flex-col group overflow-hidden relative border border-white/5 hover:border-[#ccff00]/30 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00]/0 to-transparent group-hover:via-[#ccff00] transition-all duration-700"></div>
      
      <div className="relative h-72 overflow-hidden bg-[#0a0a0a]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        <div className="absolute bottom-6 left-8 z-20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#ccff00]">
            <Icon size={24} />
          </div>
          <div>
            <span className="text-[#ccff00] text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">{tag}</span>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">{title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col bg-[#0a0a0a]">
        <p className="text-gray-400 mb-8 font-light text-lg leading-relaxed">{desc}</p>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-10 flex-grow">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full"></div>
              <span className="text-gray-300 text-sm font-medium uppercase tracking-wider text-[10px]">{feature}</span>
            </div>
          ))}
        </div>

        <Link to="/contact" className="relative inline-flex items-center justify-center w-full py-4 text-xs font-bold tracking-[0.2em] uppercase text-white border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors group overflow-hidden">
          <span className="relative z-10">Reserve Court</span>
          <div className="absolute inset-0 bg-[#ccff00]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </div>
    </div>
  </FadeUp>
);

const Courts = () => {
  const courtData = [
    {
      title: "Indoor Elite",
      tag: "Climate Controlled",
      desc: "Architecturally designed indoor arenas providing a flawless, temperature-controlled environment for uncompromising play.",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2940&auto=format&fit=crop",
      icon: Hexagon,
      features: ["Anti-Glare LED Array", "Mondo Supercourt", "Acoustic Dampening", "Panoramic Glass"]
    },
    {
      title: "Outdoor Apex",
      tag: "Classic Elements",
      desc: "Command the game under the open sky on our engineered outdoor surfaces built for aggressive performance.",
      image: "https://images.unsplash.com/photo-1622227922682-5ceafad929da?q=80&w=2940&auto=format&fit=crop",
      icon: Zap,
      features: ["Stadium Lighting", "High-Drainage Turf", "Reinforced Structure", "Pro Tension Netting"]
    },
    {
      title: "Tactical Lab",
      tag: "Private Coaching",
      desc: "An isolated, high-tech court dedicated purely to biomechanical analysis, drilling, and tactical evolution.",
      image: "https://images.unsplash.com/photo-1681283626244-129cd8809ff0?q=80&w=2940&auto=format&fit=crop",
      icon: Crosshair,
      features: ["Video Analysis System", "Ball Machine Hub", "Coach Direct Access", "Privacy Screens"]
    },
    {
      title: "Center Court",
      tag: "Tournament Ready",
      desc: "The gladiator arena. Specially configured for high-stakes matches, exhibition games, and league dominance.",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2940&auto=format&fit=crop",
      icon: ShieldCheck,
      features: ["Stadium Seating", "Digital Scoreboards", "Broadcasting Setup", "Premium Out-Zones"]
    }
  ];

  return (
    <div className="w-full pt-32 min-h-screen bg-[#030303]">
      {/* Page Header */}
      <div className="container mx-auto px-6 relative z-10 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="uppercase tracking-[0.4em] text-[#ccff00] text-xs font-bold block mb-6">The Battlegrounds</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            Engineered For <br/> <span className="text-stroke text-transparent">Excellence</span>
          </h1>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {courtData.map((court, idx) => (
            <CourtCard key={idx} {...court} delay={idx * 0.2} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courts;
