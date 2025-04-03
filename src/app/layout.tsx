import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PreBuildHead } from "./prebuild-head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rian Septiawan | Full Stack Developer",
  description:
    "Personal portfolio of Rian Septiawan, a Full Stack Developer specialized in modern web technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PreBuildHead />
        {/* Add script to clean DOM before React hydration */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Remove browser extension attributes that cause hydration issues
                function cleanElement(el) {
                  if (!el || el.tagName === 'SCRIPT') return;
                  
                  // Check for attributes with these patterns
                  var attrPatterns = ['bis_', '__processed_'];
                  
                  // Get all attributes to remove
                  var attrsToRemove = [];
                  for (var i = 0; i < el.attributes.length; i++) {
                    var attrName = el.attributes[i].name;
                    if (attrPatterns.some(p => attrName.indexOf(p) >= 0) || attrName.startsWith('_')) {
                      attrsToRemove.push(attrName);
                    }
                  }
                  
                  // Remove the attributes
                  attrsToRemove.forEach(function(attr) {
                    el.removeAttribute(attr);
                  });
                  
                  // Clean children
                  Array.from(el.children).forEach(cleanElement);
                }
                
                // Run on DOMContentLoaded
                document.addEventListener('DOMContentLoaded', function() {
                  if (document.body) cleanElement(document.body);
                });
                
                // Try to run immediately as well
                if (document.body) cleanElement(document.body);
              } catch (e) {
                console.error('DOM cleanup error', e);
              }
            })();
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
