"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollTriggerProps {
  children: ReactNode;
  threshold?: number; // 0 to 1
  rootMargin?: string; // e.g. '0px 0px -10% 0px'
  id?: string;
}

export default function ScrollTrigger({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  id,
}: ScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When element comes into view, add a visible class
          entry.target.classList.add("scroll-visible");
          // Optional: report to analytics
          if (id) {
            // This is where you could send analytics data
            console.log(`Element ${id} is now visible`);
          }
          // Once visible, no need to observe anymore
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, id]);

  return (
    <div
      ref={ref}
      className="scroll-element opacity-0 transition-opacity duration-700"
      data-id={id}
    >
      {children}
    </div>
  );
}
