"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { theme } from '@/src/app/utils/theme'; 

export default function AdminLogin({ isDarkMode = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Get current theme based on dark mode
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const colors = currentTheme.colors;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminInfo', JSON.stringify(data));
        router.push('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundColor: colors.background,
        fontFamily: currentTheme.typography.fontFamily
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-center mb-8">
            <div 
              className="relative p-3 rounded-lg"
              style={{ 
                backgroundColor: colors.primary,
                boxShadow: currentTheme.shadows.button,
                borderRadius: currentTheme.borderRadius.md
              }}
            >
              <h1 
                className="text-2xl font-bold"
                style={{ 
                  color: '#FFFFFF',
                  fontWeight: currentTheme.typography.headingWeight 
                }}
              >
                LensCrafter<span style={{ color: colors.secondary, opacity: 0.9 }}>Hub</span>
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={itemVariants}
          style={{
            backgroundColor: colors.surface,
            borderRadius: currentTheme.borderRadius.lg,
            boxShadow: currentTheme.shadows.card,
            border: `1px solid ${colors.border}`
          }}
          className="overflow-hidden"
        >
          <div className="p-8">
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-center mb-2"
              style={{ 
                color: colors.text,
                fontWeight: currentTheme.typography.headingWeight
              }}
            >
              Admin Portal
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-center mb-6"
              style={{ 
                color: colors.textSecondary,
                fontWeight: currentTheme.typography.bodyWeight,
                fontSize: '0.875rem'
              }}
            >
              Sign in to manage your store
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 flex items-start rounded"
                style={{ 
                  backgroundColor: `${colors.primary}10`,
                  borderLeft: `4px solid ${colors.primary}`,
                  color: colors.primary,
                  borderRadius: currentTheme.borderRadius.sm
                }}
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p style={{ fontWeight: currentTheme.typography.bodyWeight }}>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <motion.div variants={itemVariants} className="mb-4">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: colors.text,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none transition duration-300"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: currentTheme.borderRadius.md,
                      fontFamily: currentTheme.typography.fontFamily
                    }}
                    placeholder="admin@manswearhub.com"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `0 0 0 2px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      style={{ color: colors.textSecondary }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants} className="mb-6">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: colors.text,
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none transition duration-300"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                      borderRadius: currentTheme.borderRadius.md,
                      fontFamily: currentTheme.typography.fontFamily
                    }}
                    placeholder="••••••••"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `0 0 0 2px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.border;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      style={{ color: colors.textSecondary }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform"
                  style={{
                    backgroundColor: isLoading ? `${colors.primary}80` : colors.primary,
                    borderRadius: currentTheme.borderRadius.md,
                    boxShadow: currentTheme.shadows.button,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontWeight: currentTheme.typography.bodyWeight
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.backgroundColor = colors.accent;
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.target.style.backgroundColor = colors.primary;
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Authenticating...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </motion.div>
            </form>
          </div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="px-8 py-4 text-center border-t"
            style={{
              borderColor: colors.border,
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
            }}
          >
            <p 
              className="text-sm"
              style={{ 
                color: colors.textSecondary,
                fontWeight: currentTheme.typography.bodyWeight
              }}
            >
              © {new Date().getFullYear()} ManswearHub. All rights reserved.
            </p>
          </motion.div>
        </motion.div>

        {/* Forgot Password Link */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center"
        >
          <a
            href="#"
            className="text-sm font-medium transition duration-300 inline-flex items-center"
            style={{ 
              color: colors.textSecondary,
              fontWeight: currentTheme.typography.bodyWeight
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.textSecondary;
            }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Forgot your password?
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}