export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  level?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  featured: boolean;
  technologies?: string[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  email: string;
}
