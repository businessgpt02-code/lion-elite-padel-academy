import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courts', path: '/courts' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-8'
      }`}
    >
      <div className={`mx-auto px-6 md:px-12 transition-all duration-500 ${scrolled ? 'max-w-6xl' : 'max-w-7xl'}`}>
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'glass-card-premium px-8 py-1' : 'px-0 py-0'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center z-50 group">
            <img
              src="/logo.png"
              alt="Lion Elite Logo"
              className={`w-auto transition-all duration-500 group-hover:scale-105 ${
                scrolled ? 'h-14 sm:h-16 md:h-20' : 'h-20 sm:h-24 md:h-28'
              }`}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-sm font-semibold tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors group py-2"
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A6D608]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A6D608] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out opacity-50"></div>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold tracking-widest uppercase text-black bg-[#A6D608] rounded-full overflow-hidden group pulse-glow-btn"
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span className="relative z-10 flex items-center gap-2">Book Now</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#030303]/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden z-40"
          >
            {links.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-black uppercase tracking-widest ${
                    location.pathname === link.path ? 'text-stroke-primary text-transparent' : 'text-stroke text-transparent hover:text-white hover:-webkit-text-stroke-0'
                  } transition-all duration-300`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-[#A6D608] text-black px-10 py-4 rounded-full font-bold text-lg uppercase tracking-widest pulse-glow-btn"
              >
                Book a Session
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
