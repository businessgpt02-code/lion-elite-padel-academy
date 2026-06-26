import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      e.target.reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full pt-32 min-h-screen bg-[#030303] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#ccff00] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#ccff00]"></div>
                <span className="uppercase tracking-[0.3em] text-[#ccff00] text-sm font-bold">Connect</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Initiate <br/> <span className="text-stroke text-transparent">Contact</span>
              </h1>
              
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-16">
                Ready to dominate the court? Book a session, inquire about academy programs, or secure a private arena. We are standing by.
              </p>

              <div className="space-y-10">
                {[
                  { icon: <MapPin />, title: "The Arena", content: "Dubai Sports City\nUnited Arab Emirates" },
                  { icon: <Phone />, title: "Comms", content: "+971 50 123 4567" },
                  { icon: <Mail />, title: "Dispatch", content: "info@lionelitepadel.com" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-colors duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-1">{item.title}</h4>
                      <p className="text-white text-lg font-medium whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 px-8 py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-black transition-all duration-300 rounded-full font-bold uppercase tracking-widest text-xs group">
                  <MessageCircle size={18} />
                  Direct WhatsApp <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-premium p-10 md:p-16 h-full relative"
            >
              <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-2">Transmission</h3>
              <p className="text-gray-500 font-light mb-12">All fields are mandatory for clearance.</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-transparent focus:outline-none focus:border-[#ccff00] peer transition-colors" placeholder="First Name" id="fname" />
                    <label htmlFor="fname" className="absolute left-0 top-0 text-gray-500 text-xs uppercase tracking-[0.2em] font-bold transition-all peer-focus:-top-5 peer-focus:text-[#ccff00] peer-valid:-top-5 peer-valid:text-gray-300 pointer-events-none">First Name</label>
                  </div>
                  <div className="relative group">
                    <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-transparent focus:outline-none focus:border-[#ccff00] peer transition-colors" placeholder="Last Name" id="lname" />
                    <label htmlFor="lname" className="absolute left-0 top-0 text-gray-500 text-xs uppercase tracking-[0.2em] font-bold transition-all peer-focus:-top-5 peer-focus:text-[#ccff00] peer-valid:-top-5 peer-valid:text-gray-300 pointer-events-none">Last Name</label>
                  </div>
                </div>

                <div className="relative group">
                  <input required type="email" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-transparent focus:outline-none focus:border-[#ccff00] peer transition-colors" placeholder="Email" id="email" />
                  <label htmlFor="email" className="absolute left-0 top-0 text-gray-500 text-xs uppercase tracking-[0.2em] font-bold transition-all peer-focus:-top-5 peer-focus:text-[#ccff00] peer-valid:-top-5 peer-valid:text-gray-300 pointer-events-none">Email Coordinates</label>
                </div>

                <div className="relative group">
                  <input required type="tel" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-transparent focus:outline-none focus:border-[#ccff00] peer transition-colors" placeholder="Phone" id="phone" />
                  <label htmlFor="phone" className="absolute left-0 top-0 text-gray-500 text-xs uppercase tracking-[0.2em] font-bold transition-all peer-focus:-top-5 peer-focus:text-[#ccff00] peer-valid:-top-5 peer-valid:text-gray-300 pointer-events-none">Comms Number</label>
                </div>

                <div className="relative group pt-4">
                  <textarea required rows="1" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-transparent focus:outline-none focus:border-[#ccff00] peer transition-colors resize-none overflow-hidden" placeholder="Message" id="msg"></textarea>
                  <label htmlFor="msg" className="absolute left-0 top-4 text-gray-500 text-xs uppercase tracking-[0.2em] font-bold transition-all peer-focus:-top-2 peer-focus:text-[#ccff00] peer-valid:-top-2 peer-valid:text-gray-300 pointer-events-none">Intelligence / Request</label>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'sending' || formStatus === 'sent'}
                  className={`w-full py-5 rounded-none font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 border border-[#ccff00] ${
                    formStatus === 'sent' 
                      ? 'bg-[#ccff00] text-black' 
                      : 'bg-transparent text-[#ccff00] hover:bg-[#ccff00] hover:text-black glow-effect'
                  }`}
                >
                  {formStatus === 'idle' && <>Deploy Message <ArrowRight size={20} /></>}
                  {formStatus === 'sending' && <span className="animate-pulse">Transmitting...</span>}
                  {formStatus === 'sent' && <>Transmission Confirmed</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
