"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import Navbar from '@/src/components/Navbar';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Head>
          <title>Contact Us | Street Culture</title>
          <meta name="description" content="Get in touch with Street Culture for styling advice, order inquiries, and customer support." />
        </Head>

        <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #E71D2B 0px, #E71D2B 1px, transparent 1px, transparent 20px)'
            }} />
          </div>

          {/* Floating decorative elements */}
          <div className="fixed top-20 right-10 opacity-10">
            <svg className="h-40 w-40 text-[#E71D2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#E71D2B] font-bold text-sm tracking-widest uppercase">
                Get In Touch
              </span>
              <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter text-[#111111]">
                CONTACT <span className="text-[#E71D2B]">US</span>
              </h1>
              <p className="mt-4 text-lg text-[#666666] max-w-2xl mx-auto">
                Need style advice, help with an order, or want to collaborate? Hit us up.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form - Left Side */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#F5F5F5] rounded-2xl p-8 border border-[#E5E5E5] hover:shadow-2xl transition-all duration-300"
                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              >
                <h2 className="text-2xl font-black text-[#111111] mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E71D2B] rounded-xl flex items-center justify-center"
                    style={{ borderRadius: '12px' }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  Send Us a Message
                </h2>
                
                {submitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-[#111111] border-2 border-[#E71D2B] rounded-xl"
                    style={{ borderRadius: '12px' }}
                  >
                    <p className="text-white flex items-center font-bold">
                      <svg className="w-5 h-5 mr-2 text-[#E71D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Message sent! We'll hit you back within 24 hours.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all duration-300 font-medium text-[#111111] placeholder-[#B0B0B0]"
                      style={{ borderRadius: '12px' }}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all duration-300 font-medium text-[#111111] placeholder-[#B0B0B0]"
                      style={{ borderRadius: '12px' }}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all duration-300 font-medium text-[#111111] placeholder-[#B0B0B0]"
                      style={{ borderRadius: '12px' }}
                      placeholder="What's up?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-[#111111] mb-2 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#E71D2B] transition-all duration-300 font-medium text-[#111111] placeholder-[#B0B0B0] resize-none"
                      style={{ borderRadius: '12px' }}
                      placeholder="Tell us what you need..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-[#666666] cursor-not-allowed' 
                        : 'bg-[#E71D2B] hover:bg-[#FF4D5A]'
                    } text-white shadow-xl`}
                    style={{ 
                      boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(231, 29, 43, 0.3)',
                      borderRadius: '12px'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        SEND MESSAGE
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info - Right Side */}
              <div className="space-y-6">
                {/* Contact Card 1 - Phone */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#E71D2B] transition-all duration-300 group"
                  style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#111111] rounded-xl flex items-center justify-center group-hover:bg-[#E71D2B] transition-colors duration-300"
                      style={{ borderRadius: '12px' }}
                    >
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111111]">Hit Us Up</h3>
                      <p className="mt-2 text-[#E71D2B] font-bold text-lg">+91 62834 27681</p>
                      <p className="mt-1 text-[#666666] text-sm font-medium">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Card 2 - Email */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#E71D2B] transition-all duration-300 group"
                  style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#111111] rounded-xl flex items-center justify-center group-hover:bg-[#E71D2B] transition-colors duration-300"
                      style={{ borderRadius: '12px' }}
                    >
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111111]">Email Us</h3>
                      <p className="mt-2 text-[#E71D2B] font-bold">support@streetculture.com</p>
                      <p className="mt-1 text-[#666666] text-sm font-medium">Response within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Card 3 - Location */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5] hover:border-[#E71D2B] transition-all duration-300 group"
                  style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-[#111111] rounded-xl flex items-center justify-center group-hover:bg-[#E71D2B] transition-colors duration-300"
                      style={{ borderRadius: '12px' }}
                    >
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111111]">Find Us</h3>
                      <p className="mt-2 text-[#111111] font-medium leading-relaxed">
                        646X+78Q, Chandigarh Road, near Oasis Hotel
                      </p>
                      <p className="mt-1 text-[#666666] text-sm font-medium">Garhshankar, Punjab, India, 144527</p>
                      <p className="mt-2 inline-block px-3 py-1 bg-[#E71D2B] text-white text-xs font-bold rounded-full">
                        BY APPOINTMENT ONLY
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-[#111111] rounded-2xl p-6 border-2 border-[#2A2A2A]"
                  style={{ borderRadius: '12px' }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">Connect With The Culture</h3>
                  <p className="text-gray-400 mb-6 text-sm">Follow for streetwear drops, style inspo, and exclusive deals</p>
                  <div className="flex gap-3">
                    {[
                      { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400' },
                      { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84', color: 'hover:bg-[#1DA1F2]' },
                      { name: 'YouTube', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z', color: 'hover:bg-[#FF0000]' },
                      { name: 'Discord', icon: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z', color: 'hover:bg-[#5865F2]' }
                    ].map((social, index) => (
                      <motion.a
                        key={social.name}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 bg-[#2A2A2A] text-gray-400 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white`}
                        style={{ borderRadius: '12px' }}
                        aria-label={social.name}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}