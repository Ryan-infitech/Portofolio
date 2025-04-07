"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";

interface HorizontalScrollProps {
  children: ReactNode[];
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

export default function HorizontalScroll({
  children,
  currentSection,
  setCurrentSection,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { width: windowWidth } = useWindowSize();
  const [containerWidth, setContainerWidth] = useState(0);
  const [sectionWidths, setSectionWidths] = useState<number[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollCooldown = 800; // ms cooldown between horizontal scrolls
  const navbarHeight = 72; // estimated height of navbar in pixels

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = Array(children.length).fill(null);
  }, [children.length]);

  // Calculate section widths when window size changes
  useEffect(() => {
    const updateSectionWidths = () => {
      if (containerRef.current) {
        const sections = Array.from(containerRef.current.children);
        const screenWidth = window.innerWidth;
        const widths = sections.map(() => screenWidth);
        
        setSectionWidths(widths);
        setContainerWidth(screenWidth * sections.length);
        
        // Apply fixed width to each section
        sections.forEach((section) => {
          const sectionEl = section as HTMLElement;
          sectionEl.style.width = `${screenWidth}px`;
          sectionEl.style.minWidth = `${screenWidth}px`;
          sectionEl.style.minHeight = `calc(100vh - ${navbarHeight}px)`;
          sectionEl.style.height = `calc(100vh - ${navbarHeight}px)`;
          sectionEl.style.overflowY = "auto";
          sectionEl.style.overflowX = "hidden";
        });
      }
    };

    updateSectionWidths();
    window.addEventListener("resize", updateSectionWidths);
    return () => window.removeEventListener("resize", updateSectionWidths);
  }, [windowWidth, children.length]);

  // Handle touch events for swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const distance = touchStartX - touchEndX;

      if (Math.abs(distance) > minSwipeDistance) {
        const now = Date.now();
        if (now - lastScrollTime > scrollCooldown && !isScrolling) {
          setIsScrolling(true);
          setLastScrollTime(now);

          if (distance > 0 && currentSection < children.length - 1) {
            setCurrentSection(currentSection + 1);
          } else if (distance < 0 && currentSection > 0) {
            setCurrentSection(currentSection - 1);
          }

          setTimeout(() => setIsScrolling(false), 500);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [children.length, currentSection, lastScrollTime, isScrolling, setCurrentSection]);

  // Handle wheel events for navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const section = sectionRefs.current[currentSection];

      if (!section) return;

      // Check if the section can be scrolled vertically
      const canScrollUp = section.scrollTop > 0;
      const canScrollDown =
        section.scrollTop < section.scrollHeight - section.clientHeight - 5;

      // Determine scroll direction
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // If we can scroll vertically within the section, do that first
      if ((isScrollingDown && canScrollDown) || (isScrollingUp && canScrollUp)) {
        return; // Let default scroll happen
      }

      // Otherwise, handle horizontal section navigation with cooldown
      if (now - lastScrollTime > scrollCooldown && !isScrolling) {
        e.preventDefault();
        setIsScrolling(true);
        setLastScrollTime(now);

        if (isScrollingDown && currentSection < children.length - 1) {
          setCurrentSection(currentSection + 1);
        } else if (isScrollingUp && currentSection > 0) {
          setCurrentSection(currentSection - 1);
        }

        setTimeout(() => setIsScrolling(false), 500);
      } else {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [children.length, currentSection, lastScrollTime, isScrolling, setCurrentSection]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();

      if (now - lastScrollTime > scrollCooldown && !isScrolling) {
        if (e.key === "ArrowRight" && currentSection < children.length - 1) {
          setIsScrolling(true);
          setLastScrollTime(now);
          setCurrentSection(currentSection + 1);
          setTimeout(() => setIsScrolling(false), 500);
        } else if (e.key === "ArrowLeft" && currentSection > 0) {
          setIsScrolling(true);
          setLastScrollTime(now);
          setCurrentSection(currentSection - 1);
          setTimeout(() => setIsScrolling(false), 500);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [children.length, currentSection, lastScrollTime, isScrolling, setCurrentSection]);

  const calculateX = () => {
    if (sectionWidths.length === 0) return 0;
    return -currentSection * window.innerWidth;
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="pt-[72px] h-full">
        <motion.div
          ref={containerRef}
          className="flex h-full"
          animate={{ x: calculateX() }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: `${containerWidth}px` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 dark:scrollbar-thumb-indigo-400 dark:scrollbar-track-gray-700"
            >
              {child}
            </div>
          ))}
        </motion.div>

        {/* Navigation Dots */}
        <div className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-40 px-2 py-1 md:py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full">
          {children.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${
                currentSection === index
                  ? "bg-indigo-600 dark:bg-indigo-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => setCurrentSection(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
