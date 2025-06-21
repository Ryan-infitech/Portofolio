// Projects data
export const projects = [
  {
    id: 1,
    title: "TokoTech - E-Commerce Platform",
    description:
      "A comprehensive full-stack e-commerce platform for technology products, featuring secure payment processing via Midtrans, admin dashboard with real-time analytics, inventory management, and modern shopping experience built with Next.js 14 and Express.js.",
    technologies: ["Next.js 14", "Express.js", "PostgreSQL", "Supabase", "Tailwind CSS", "NextAuth.js", "Midtrans", "Chart.js", "Zustand", "React Hook Form"],
    image: "/images/tokotech.gif",
    link: "https://tokotech.live/",
    github: "https://github.com/Ryan-infitech/Tokotech-webApp",
    tags: ["E-Commerce", "Full Stack", "Web App"],
    featured: true,
  },
  {
    id: 2,
    title: "Indonesia Disaster Monitoring System",
    description:
      "An interactive web application that provides real-time information about natural disasters in Indonesia, utilizing React, Leaflet.js, and AWS for scalable cloud deployment.",
    technologies: ["React", "Leaflet.js", "AWS", "Vercel", "Node.js", "BNPB"],
    image: "/images/previewproject1.gif",
    link: "https://petabencanaindonesia.web.id/",
    github: "https://github.com/Ryan-infitech/Map-Informasi-Bencana",
    tags: ["Web App", "Mapping", "Full Stack"],
    featured: true,
  },
  {
    id: 3,
    title: "Hospital Management System",
    description:
      "A comprehensive web application for managing hospital operations, appointments, and patient records, developed using the Laravel framework and MySQL database.",
    technologies: ["PHP", "Laravel", "MySQL"],
    image: "/images/previewproject2.gif",
    link: "#",
    github: "https://github.com/Ryan-infitech/Rumah-Sakit-Laravel",
    tags: ["Web App", "Healthcare", "Backend"],
    featured: false,
  },
  {
    id: 4,
    title: "Java Social Media Application",
    description:
      "A simple social media application built using Java with a graphical interface (GUI) using JFrame Form. This application integrates AWS DynamoDB as a database to store user data and social media content.",
    technologies: ["Java", "JFrame", "AWS DynamoDB", "NetBeans"],
    image: "/images/previewproject3.gif",
    link: "#",
    github: "https://github.com/Ryan-infitech/Aplikasi-SocialMedia-java",
    tags: ["Desktop App", "Social Media", "Database"],
    featured: false,
  },
];

// Skills data
export const skills = [
  // Frontend
  { id: 1, name: "React", icon: "react", category: "frontend" },
  { id: 2, name: "TypeScript", icon: "code", category: "frontend" },
  { id: 3, name: "JavaScript", icon: "code", category: "frontend" },
  { id: 4, name: "HTML5", icon: "code", category: "frontend" },
  { id: 5, name: "CSS3", icon: "palette", category: "frontend" },
  { id: 6, name: "Tailwind CSS", icon: "palette", category: "frontend" },
  { id: 7, name: "Redux", icon: "code", category: "frontend" },
  { id: 8, name: "Next.js", icon: "react", category: "frontend" },
  { id: 9, name: "React Native", icon: "smartphone", category: "frontend" },
  { id: 10, name: "Vue.js", icon: "code", category: "frontend" },
  { id: 11, name: "SASS/SCSS", icon: "palette", category: "frontend" },
  { id: 12, name: "Angular", icon: "code", category: "frontend" },

  // Backend
  { id: 13, name: "Node.js", icon: "server", category: "backend" },
  { id: 14, name: "Express", icon: "server", category: "backend" },
  { id: 15, name: "AWS", icon: "database", category: "backend" },
  { id: 16, name: "PostgreSQL", icon: "database", category: "backend" },
  { id: 17, name: "Supabase", icon: "database", category: "backend" },
  { id: 18, name: "REST API", icon: "server", category: "backend" },
  { id: 19, name: "Python", icon: "code", category: "backend" },
  { id: 20, name: "Django", icon: "server", category: "backend" },
  { id: 21, name: "Firebase", icon: "database", category: "backend" },
  { id: 22, name: "SQL", icon: "database", category: "backend" },

  // Tools
  { id: 23, name: "Git", icon: "git-branch", category: "tools" },
  { id: 24, name: "Docker", icon: "box", category: "tools" },
  { id: 25, name: "AWS", icon: "cloud", category: "tools" },
  { id: 26, name: "Jest", icon: "test-tube", category: "tools" },
  { id: 27, name: "Figma", icon: "figma", category: "tools" },
  { id: 28, name: "Webpack", icon: "package", category: "tools" },
  { id: 29, name: "CI/CD", icon: "git-branch", category: "tools" },
  { id: 30, name: "VS Code", icon: "code", category: "tools" },

  // Other
  { id: 31, name: "Agile/Scrum", icon: "users", category: "other" },
  { id: 32, name: "UX/UI Design", icon: "figma", category: "other" },
  { id: 33, name: "SEO", icon: "search", category: "other" },
  { id: 34, name: "Performance Optimization", icon: "zap", category: "other" },
  { id: 35, name: "Responsive Design", icon: "smartphone", category: "other" },
];

// Experience data
export const experiences = [
  {
    id: 1,
    company: "AfterPrahara",
    position: "Full Stack Web Developer",
    duration: "2024",
    description: [
      "Designed and developed the homepage for AfterPrahara, a band from West Sumatra, enhancing their online presence.",
      "Collaborated closely with the band to capture their brand identity, translating it into a visually appealing and user-friendly website design.",
      "Integrated features such as a media gallery, event schedule, and contact form to boost fan engagement and streamline communication.",
      "Ensured the website was optimized for search engines, improving visibility and audience reach.",
      "Utilized technologies including HTML, CSS, and JavaScript to build a responsive and accessible website.",
    ],
  },
];

// Education data
export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Informatic Engineering Education",
    institution: "Padang State University",
    duration: "2023 - 2027",
    description:
      "Specialized in web development with expertise in React for building dynamic user interfaces and Laravel for developing robust backend systems. Passionate about integrating machine learning applications into web platforms to enhance functionality and user experience.",
  },
];

// Certification data
export const certifications = [
  {
    id: 1,
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "2025",
    link: "https://aws.amazon.com/certification/certified-developer-associate/",
  },
];

// Social links
export const socialLinks = {
  github: "https://github.com/Ryan-infitech",
  linkedin: "https://www.linkedin.com/in/rian-septiawan",
  twitter: "https://twitter.com/rianseptiawan",
  instagram: "https://instagram.com/ryan.septiawan__",
  email: "rianseptiawan@infitech.or.id",
  website: "https://www.rianseptiawan.engineer",
};
