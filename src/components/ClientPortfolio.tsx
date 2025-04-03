"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import HorizontalScroll from "./HorizontalScroll";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import { Project } from "@/lib/types";

interface ClientPortfolioProps {
  initialProjects: Project[];
}

export default function ClientPortfolio({
  initialProjects,
}: ClientPortfolioProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handler for navigation
  const handleNavigate = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
        <Projects initialProjects={initialProjects} />
        <Experience />
        <Contact />
      </HorizontalScroll>
    </div>
  );
}
