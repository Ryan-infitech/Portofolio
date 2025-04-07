import { socialLinks } from "@/data/index";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rian Septiawan",
    jobTitle: "Full Stack Developer",
    url: "https://rianseptiawan.me",
    sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
    email: socialLinks.email,
    description:
      "Full Stack Developer specializing in React, TypeScript, Node.js, and AWS. Creating responsive web applications with modern UI/UX principles.",
    knowsAbout: [
      "Web Development",
      "React",
      "TypeScript",
      "Node.js",
      "AWS",
      "Frontend Development",
      "Backend Development",
      "Responsive Design",
      "UI/UX Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
