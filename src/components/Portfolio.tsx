import ClientPortfolio from './ClientPortfolio';
import { projects } from '@/lib/data';

// This is a server component that fetches data and passes it to client components
export default function Portfolio() {
  // Here you could fetch data from an API, database, etc.
  // Since we're statically importing data now, this is simple,
  // but in a real app, you might do more server-side work here
  
  return (
    <ClientPortfolio initialProjects={projects} />
  );
}
