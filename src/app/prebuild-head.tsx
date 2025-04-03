"use client";

import { useEffect } from "react";

export function PreBuildHead() {
  // Run cleanup immediately on mount
  useEffect(() => {
    // More aggressive cleanup function
    const cleanupDOM = () => {
      try {
        // Known problematic attributes from extensions like BitDefender
        const attributePatterns = [
          "bis_",
          "__processed_",
          "data-bit",
          "data-dapp",
          "-extension-",
          "_extension_",
        ];

        // Function to determine if an attribute should be removed
        const shouldRemoveAttribute = (name: string) => {
          return (
            attributePatterns.some((pattern) => name.includes(pattern)) ||
            name.startsWith("_") ||
            (name.startsWith("data-") &&
              !name.startsWith("data-next") &&
              !name.startsWith("data-testid"))
          );
        };

        // Clean a single element
        const cleanElement = (element: Element) => {
          // Skip script and style tags
          if (
            element.tagName === "SCRIPT" ||
            element.tagName === "STYLE" ||
            element.tagName === "LINK"
          ) {
            return;
          }

          // Add suppressHydrationWarning to elements
          if (element instanceof HTMLElement) {
            element.setAttribute("suppressHydrationWarning", "true");
          }

          // Check all attributes
          const attributesToRemove: string[] = [];
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            if (shouldRemoveAttribute(attr.name)) {
              attributesToRemove.push(attr.name);
            }
          }

          // Remove identified attributes
          attributesToRemove.forEach((attr) => {
            element.removeAttribute(attr);
          });

          // Process children
          Array.from(element.children).forEach((child) => {
            cleanElement(child);
          });
        };

        // Start at the body
        if (document.body) {
          cleanElement(document.body);
          document.body.classList.add("dom-cleaned");
        }

        // Set up mutation observer to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            // Handle added nodes
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                cleanElement(node as Element);
              }
            });

            // Handle attribute changes
            if (mutation.type === "attributes" && mutation.attributeName) {
              const el = mutation.target as Element;
              if (shouldRemoveAttribute(mutation.attributeName)) {
                el.removeAttribute(mutation.attributeName);
              }
            }
          });
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
        });

        return () => observer.disconnect();
      } catch (err) {
        console.error("DOM cleanup error:", err);
      }
    };

    // Run cleanup on mount
    cleanupDOM();

    // And after a short delay to catch any late injections
    const timeoutId = setTimeout(cleanupDOM, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
