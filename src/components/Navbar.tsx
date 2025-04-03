"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const sections = [
  { id: 0, name: "Home" },
  { id: 1, name: "About" },
  { id: 2, name: "Projects" },
  { id: 3, name: "Experience" },
  { id: 4, name: "Contact" },
];

const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  setCurrentSection,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true once component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Create event handlers here to prevent hydration mismatches
  const handleSectionClick = (id: number) => {
    if (mounted) {
      setCurrentSection(id);
      setIsMenuOpen(false);
    }
  };

  const handleThemeToggle = () => {
    if (mounted) {
      toggleTheme();
    }
  };

  const handleMenuToggle = () => {
    if (mounted) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // Use the same structure for both server and client, just disable animations and interactions server-side
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-4 flex justify-between items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
      suppressHydrationWarning
    >
      <div 
        className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center"
        suppressHydrationWarning
      >
        <span className="text-indigo-600 dark:text-indigo-400 mr-1">Rian</span>
        Septiawan
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6" suppressHydrationWarning>
        <ul className="flex space-x-1" suppressHydrationWarning>
          {sections.map((section) => (
            <li 
              key={section.id} 
              className="relative px-2"
              suppressHydrationWarning
            >
              <button
                onClick={() => handleSectionClick(section.id)}
                className={`relative py-2 px-3 rounded-full font-medium text-sm transition-colors duration-200
                  ${
                    currentSection === section.id
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                suppressHydrationWarning
              >
                {section.name}
                {currentSection === section.id && mounted && (
                  <div 
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full -z-10"
                    suppressHydrationWarning
                  ></div>
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          suppressHydrationWarning
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* Mobile Navigation Button */}
      <div className="flex items-center space-x-3 md:hidden" suppressHydrationWarning>
        <button
          onClick={handleThemeToggle}
          className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          suppressHydrationWarning
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <button
          onClick={handleMenuToggle}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-200"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          suppressHydrationWarning
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu - Only render on client side */}
      {mounted && isMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg md:hidden mt-1 rounded-b-xl overflow-hidden"
          suppressHydrationWarning
        >
          <ul className="py-3" suppressHydrationWarning>
            {sections.map((section) => (
              <li
                key={section.id}
                className="px-5 py-2"
                suppressHydrationWarning
              >
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`block w-full text-left font-medium text-sm py-2 px-3 rounded-lg transition-colors duration-200
                    ${
                      currentSection === section.id
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  suppressHydrationWarning
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
