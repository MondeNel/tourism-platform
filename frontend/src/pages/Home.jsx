import Hero from '@/components/home/Hero';
import RouteTowns from '@/components/home/RouteTowns';
import Experiences from '@/components/home/Experiences';
import RoutesStrip from '@/components/home/RoutesStrip';
import DirectoryTeaser from '@/components/home/DirectoryTeaser';
import AIAssistantTeaser from '@/components/home/AIAssistantTeaser';

export default function Home() {
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
