import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#030303] pt-16 pb-8 relative overflow-hidden">
      {/* Massive subtle background logo/text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] select-none">
        <span className="text-[20vw] font-black uppercase leading-none tracking-tighter">ELITE</span>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 border-b border-white/10 pb-16">
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-6">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo.png" alt="Lion Elite Logo" className="h-24 w-auto" />
            </Link>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl font-light">
              Engineering champions through discipline, precision, and an unyielding environment of excellence.
            </p>
            <div className="flex gap-4">
              {[Globe, Users, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#A6D608] hover:text-[#A6D608] transition-colors duration-300 bg-[#0a0a0a]">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About', 'Courts', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-[#A6D608] font-light transition-colors relative group inline-block">
                    <span className="relative z-10">{item}</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#A6D608] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Intel */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8">Intelligence</h4>
            <ul className="flex flex-col gap-6">
              <li className="text-gray-400 font-light">
                <span className="block text-white font-bold mb-1 uppercase text-xs tracking-wider">Coordinates</span>
                Dubai Sports City, UAE
              </li>
              <li className="text-gray-400 font-light">
                <span className="block text-white font-bold mb-1 uppercase text-xs tracking-wider">Comms</span>
                +971 50 123 4567<br/>
                info@lionelitepadel.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-[0.1em] text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Lion Elite. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
