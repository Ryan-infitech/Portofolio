"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HorizontalScroll from '@/components/HorizontalScroll';
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

export default function Page() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle navigation between sections
  const handleNavigate = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <HorizontalScroll
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      >
        <Home onNavigate={handleNavigate} />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </HorizontalScroll>
    </main>
  );
}
