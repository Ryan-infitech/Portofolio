import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Rian Septiawan - Full Stack Developer Portfolio",
    template: "%s | Rian Septiawan",
  },
  description:
    "Full Stack Developer specializing in React, TypeScript, Node.js, and AWS. Creating responsive web applications with modern UI/UX principles.",
  keywords: [
    "full stack developer",
    "rian",
    "programmer padang",
    "programmer sumatera barat",
    "jasa pembuatan website padang",
    "web developer padang",
    "web development",
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "frontend developer",
    "backend developer",
    "Rian Septiawan",
    "software engineer",
  ],
  authors: [{ name: "Rian Septiawan" }],
  creator: "Rian Septiawan",
  publisher: "Rian Septiawan",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://www.rianseptiawan.engineer"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rian Septiawan - Full Stack Developer Portfolio",
    description:
      "Full Stack Developer specializing in React, TypeScript, Node.js, and AWS. Creating responsive web applications with modern UI/UX principles.",
    url: "https://www.rianseptiawan.engineer",
    siteName: "Rian Septiawan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rian Septiawan - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rian Septiawan - Full Stack Developer Portfolio",
    description:
      "Full Stack Developer specializing in React, TypeScript, Node.js, and AWS.",
    creator: "@rianseptiawan",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: { url: "/images/tabaorendong.ico" },
    apple: [{ url: "/apple-icon.png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
