import Hero from '@/components/home/Hero';
import RouteTowns from '@/components/home/RouteTowns';
import Experiences from '@/components/home/Experiences';
import RoutesStrip from '@/components/home/RoutesStrip';
import DirectoryTeaser from '@/components/home/DirectoryTeaser';
import AIAssistantTeaser from '@/components/home/AIAssistantTeaser';
import useDocumentTitle from '@/hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle(
    null,
    'Discover Prieska, Marydale & Niekerkshoop — dark-sky stargazing, Orange River adventures and Karoo heritage in the Northern Cape.'
  );

  return (
    <>
      <Hero />
      <RouteTowns />
      <Experiences />
      <RoutesStrip />
      <DirectoryTeaser />
      <AIAssistantTeaser />
    </>
  );
}
