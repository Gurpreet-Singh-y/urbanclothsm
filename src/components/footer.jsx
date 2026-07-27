"use client";
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { theme } from '@/src/app/utils/theme'; // Adjust the import path as needed

const Footer = ({ isDarkMode = false }) => {
  // Get current theme based on dark mode
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const colors = currentTheme.colors;

  return (
    <footer 
      className="pt-12 pb-8"
      style={{ 
        backgroundColor: colors.secondary,
        fontFamily: currentTheme.typography.fontFamily
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="space-y-4">
            <h3 
              className="text-lg font-semibold"
              style={{ 
                color: colors.text,
                fontWeight: currentTheme.typography.headingWeight
              }}
            >
              About Manswear
            </h3>
            <p 
              style={{ 
                color: colors.textSecondary,
                fontWeight: currentTheme.typography.bodyWeight,
                lineHeight: '1.6'
              }}
            >
              We provide premium menswear that combines style, comfort, and quality to help you look your best every day.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="transition-all duration-300 transform hover:scale-110"
                style={{ color: colors.textSecondary }}
                aria-label="Facebook"
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="#" 
                className="transition-all duration-300 transform hover:scale-110"
                style={{ color: colors.textSecondary }}
                aria-label="Twitter"
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://www.instagram.com/jot1877g/" 
                className="transition-all duration-300 transform hover:scale-110"
                style={{ color: colors.textSecondary }}
                aria-label="Instagram"
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="#" 
                className="transition-all duration-300 transform hover:scale-110"
                style={{ color: colors.textSecondary }}
                aria-label="LinkedIn"
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 
              className="text-lg font-semibold"
              style={{ 
                color: colors.text,
                fontWeight: currentTheme.typography.headingWeight
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/pages/products-page" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/pages/about" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/pages/contacts" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 
              className="text-lg font-semibold"
              style={{ 
                color: colors.text,
                fontWeight: currentTheme.typography.headingWeight
              }}
            >
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/faq" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="transition-colors duration-300"
                  style={{ 
                    color: colors.textSecondary,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 
              className="text-lg font-semibold"
              style={{ 
                color: colors.text,
                fontWeight: currentTheme.typography.headingWeight
              }}
            >
              Contact Us
            </h3>
            <address 
              className="not-italic"
              style={{ 
                color: colors.textSecondary,
                fontWeight: currentTheme.typography.bodyWeight,
                lineHeight: '1.6'
              }}
            >
              <p>646X+78Q, Chandigarh Road, near Oasis Hotel, Garhshankar, Punjab 144527, India</p>
              <p>Garhshanker, Punjab, India, 144527</p>
              <p className="mt-2">Email: contact@manswearhub.com</p>
              <p>Phone: +91 62834 27681</p>
            </address>
            
            {/* Newsletter */}
            <div className="pt-2">
              <h4 
                className="font-medium mb-2"
                style={{ 
                  color: colors.text,
                  fontWeight: currentTheme.typography.headingWeight
                }}
              >
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md focus:outline-none w-full transition-all duration-300"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    borderRadius: `${currentTheme.borderRadius.sm} 0 0 ${currentTheme.borderRadius.sm}`,
                    fontFamily: currentTheme.typography.fontFamily
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.border;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button 
                  className="px-4 py-2 font-medium transition-all duration-300"
                  style={{
                    backgroundColor: colors.primary,
                    color: '#FFFFFF',
                    borderRadius: `0 ${currentTheme.borderRadius.sm} ${currentTheme.borderRadius.sm} 0`,
                    fontWeight: currentTheme.typography.bodyWeight,
                    boxShadow: currentTheme.shadows.button
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.primary;
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          className="mt-12 pt-8 text-center"
          style={{ 
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <p 
            style={{ 
              color: colors.textSecondary,
              fontWeight: currentTheme.typography.bodyWeight,
              fontSize: '0.875rem'
            }}
          >
            &copy; {new Date().getFullYear()} Manswear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;