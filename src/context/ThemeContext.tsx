"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Start with a default theme state of "light"
  const [theme, setTheme] = useState<Theme>("light");
  // Track if component has mounted to prevent hydration issues
  const [mounted, setMounted] = useState(false);

  // Initialize theme state once when component mounts
  useEffect(() => {
    // Mark as mounted to allow client-side updates
    setMounted(true);

    try {
      // Attempt to read from localStorage
      const storedTheme = localStorage.getItem("theme") as Theme;
      if (storedTheme === "dark") {
        setTheme("dark");
      } else {
        // Default to light if no valid theme is found
        setTheme("light");
        localStorage.setItem("theme", "light");
      }
    } catch (error) {
      // Fallback in case localStorage is not available
      console.error("Error accessing localStorage:", error);
      setTheme("light");
    }
  }, []);

  // Apply theme class to document whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    try {
      // Update localStorage with current theme
      localStorage.setItem("theme", theme);

      // Apply or remove dark class based on theme
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Force a repaint to ensure styles are applied
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  }, [theme, mounted]);

  // Simple toggle function that directly sets the opposite theme
  const toggleTheme = () => {
    if (!mounted) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log("Theme toggled to:", newTheme); // Debug log
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
