'use client'; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
  FaArrowLeft,
  FaShoppingBag,
  FaCode,
  FaPalette,
  FaRocket,
} from "react-icons/fa";
import { theme } from "@/src/app/utils/theme";
const About = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const currentTheme = darkMode ? theme.dark : theme.light;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const skills = [
    { icon: <FaCode />, name: "Next.js", level: "Advanced" },
    { icon: <FaPalette />, name: "Tailwind CSS", level: "Intermediate" },
    { icon: <FaRocket />, name: "Framer Motion", level: "Intermediate" },
    { icon: <FaShoppingBag />, name: "MongoDB", level: "Basic" },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
        fontFamily: currentTheme.typography.fontFamily,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{ backgroundColor: currentTheme.colors.primary }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{ backgroundColor: currentTheme.colors.accent }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: darkMode
            ? "rgba(10, 10, 10, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
          borderBottom: `1px solid ${currentTheme.colors.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="flex items-center gap-2 transition-colors"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              <FaArrowLeft />
              <span className="font-medium">Back to Store</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg transition-all"
              style={{
                backgroundColor: currentTheme.colors.surface,
                color: currentTheme.colors.text,
                boxShadow: currentTheme.shadows.card,
              }}
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
      >
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10">
              <motion.span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: "#FFFFFF",
                }}
              >
                About Me
              </motion.span>

              <h1
                className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ fontWeight: currentTheme.typography.headingWeight }}
              >
                Crafting Digital
                <br />
                <span style={{ color: currentTheme.colors.primary }}>
                  Experiences
                </span>
              </h1>

              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Passionate web developer creating modern e-commerce solutions
                with cutting-edge technologies. Focused on delivering seamless
                user experiences that convert visitors into loyal customers.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
              style={{ borderRadius: currentTheme.borderRadius.lg }}
            >
              <div
                className="w-72 h-72 lg:w-96 lg:h-96 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}20, ${currentTheme.colors.accent}20)`,
                  boxShadow: currentTheme.shadows.card,
                }}
              >
                <div
                  className="w-56 h-56 lg:w-72 lg:h-72 rounded-full flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    border: `3px solid ${currentTheme.colors.primary}`,
                  }}
                >
                  <FaUserGraduate
                    size={80}
                    style={{ color: currentTheme.colors.primary }}
                  />
                  <div
                    className="text-lg font-bold mt-4"
                    style={{
                      fontFamily: currentTheme.typography.fontFamily,
                    }}
                  >
                    GS
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Info Cards */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: <FaUserGraduate size={24} />,
              label: "Student",
              value: "Gurpreet Singh",
            },
            {
              icon: <FaMapMarkerAlt size={24} />,
              label: "University",
              value: "Punjabi University Patiala",
            },
            {
              icon: <FaLaptopCode size={24} />,
              label: "Roll Number",
              value: "12401186",
            },
          ].map((info, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 transition-all duration-300"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderRadius: currentTheme.borderRadius.md,
                boxShadow: currentTheme.shadows.card,
                border: `1px solid ${currentTheme.colors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${currentTheme.colors.primary}15`,
                  color: currentTheme.colors.primary,
                }}
              >
                {info.icon}
              </div>
              <h3
                className="font-semibold mb-2"
                style={{
                  fontWeight: currentTheme.typography.headingWeight,
                }}
              >
                {info.label}
              </h3>
              <p style={{ color: currentTheme.colors.textSecondary }}>
                {info.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Project & Skills Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Project Info */}
          <motion.div variants={itemVariants}>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontWeight: currentTheme.typography.headingWeight }}
            >
              Current Project
            </h2>

            <div
              className="p-8"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderRadius: currentTheme.borderRadius.lg,
                boxShadow: currentTheme.shadows.card,
                border: `1px solid ${currentTheme.colors.border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <FaShoppingBag
                  size={28}
                  style={{ color: currentTheme.colors.primary }}
                />
                <h3
                  className="text-2xl font-bold"
                  style={{ fontWeight: currentTheme.typography.headingWeight }}
                >
                  E-Commerce Platform
                </h3>
              </div>

              <p
                className="mb-8 leading-relaxed"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Building a modern, feature-rich e-commerce platform using
                Next.js and MongoDB. Implementing responsive design with
                Tailwind CSS and smooth animations with Framer Motion.
              </p>

              <div className="space-y-4">
                <h4
                  className="font-semibold mb-4"
                  style={{
                    fontWeight: currentTheme.typography.headingWeight,
                  }}
                >
                  Tech Stack
                </h4>
                {[
                  { label: "Framework", value: "Next.js" },
                  { label: "Styling", value: "Tailwind CSS" },
                  { label: "Database", value: "MongoDB" },
                  { label: "Image CDN", value: "Cloudinary" },
                  { label: "Animations", value: "Framer Motion" },
                ].map((tech, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span style={{ color: currentTheme.colors.textSecondary }}>
                      {tech.label}
                    </span>
                    <span className="font-medium">{tech.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontWeight: currentTheme.typography.headingWeight }}
            >
              Skills & Expertise
            </h2>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="p-5 flex items-center gap-4 transition-all"
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderRadius: currentTheme.borderRadius.md,
                    boxShadow: currentTheme.shadows.card,
                    border: `1px solid ${currentTheme.colors.border}`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    style={{
                      backgroundColor: `${currentTheme.colors.primary}15`,
                      color: currentTheme.colors.primary,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="font-semibold"
                        style={{
                          fontWeight: currentTheme.typography.headingWeight,
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="text-sm px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${currentTheme.colors.primary}15`,
                          color: currentTheme.colors.primary,
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{
                        backgroundColor: currentTheme.colors.border,
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            skill.level === "Advanced"
                              ? "90%"
                              : skill.level === "Intermediate"
                              ? "65%"
                              : "35%",
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: currentTheme.colors.primary,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 text-center"
              style={{
                backgroundColor: currentTheme.colors.surface,
                borderRadius: currentTheme.borderRadius.lg,
                boxShadow: currentTheme.shadows.card,
                border: `2px solid ${currentTheme.colors.primary}30`,
              }}
            >
              <p
                className="text-lg italic"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                "Building the future of e-commerce, one component at a time."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      
    </div>
  );
};

export default About;