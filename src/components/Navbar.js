"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/src/app/utils/theme';

export default function Navbar({ isDarkMode = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [darkMode, setDarkMode] = useState(isDarkMode);

  useEffect(() => {
    const updateDarkMode = () => {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const rootHasDarkClass = document.documentElement.classList.contains('dark');
      setDarkMode(isDarkMode || rootHasDarkClass || prefersDark);
    };

    updateDarkMode();

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener?.('change', updateDarkMode);

    return () => {
      mediaQuery?.removeEventListener?.('change', updateDarkMode);
    };
  }, [isDarkMode]);

  // Get current theme based on dark mode
  const currentTheme = darkMode ? theme.dark : theme.light;
  const colors = currentTheme.colors;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/pages/products-page' },
    { name: 'About', path: '/pages/about' },
    { name: 'Contact', path: '/pages/contacts' },
  ];

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-500"
      style={{ 
        backgroundColor: darkMode
          ? 'rgba(0, 0, 0, 0.95)'
          : scrolled
          ? colors.surface
          : `${colors.secondary}E6`,
        boxShadow: scrolled ? currentTheme.shadows.card : 'none',
        fontFamily: currentTheme.typography.fontFamily,
        paddingTop: scrolled ? '0.5rem' : '1rem',
        paddingBottom: scrolled ? '0.5rem' : '1rem',
        backdropFilter: scrolled ? 'none' : 'blur(8px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link 
              href="/" 
              className="text-2xl font-bold"
              style={{ 
                color: colors.text,
                fontWeight: currentTheme.typography.headingWeight
              }}
            >
              Urban<span style={{ color: colors.primary }}>clothes</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                onHoverStart={() => setActiveLink(link.name)}
                onHoverEnd={() => setActiveLink(null)}
                className="relative"
              >
                <Link
                  href={link.path}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-300"
                  style={{ 
                    color: colors.text,
                    fontWeight: currentTheme.typography.bodyWeight,
                    borderRadius: currentTheme.borderRadius.sm
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.text}
                  onMouseLeave={(e) => {
                    if (activeLink !== link.name) {
                      e.target.style.color = colors.text;
                    }
                  }}
                >
                  {link.name}
                </Link>
                {activeLink === link.name && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full"
                    style={{ 
                      height: '2px',
                      backgroundColor: colors.primary,
                      borderRadius: currentTheme.borderRadius.sm
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              style={{ color: colors.text }}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ 
              backgroundColor: colors.surface,
              boxShadow: currentTheme.shadows.card
            }}
          >
            <div className="px-2 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={link.path}
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    style={{ 
                      color: colors.text,
                      fontWeight: currentTheme.typography.bodyWeight,
                      borderRadius: currentTheme.borderRadius.md,
                      backgroundColor: 'transparent'
                    }}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.08)' : `${colors.primary}15`}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}