import { Metadata } from 'next';
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: 'Rian Septiawan | Full Stack Developer',
  description: 'Personal portfolio showcasing my web development projects and skills',
};

export default function Home() {
  return <Portfolio />;
}
