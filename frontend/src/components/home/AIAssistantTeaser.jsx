import { Sparkles } from 'lucide-react';
import CoordStamp from '@/components/ui/CoordStamp';
import Button from '@/components/ui/Button';

export default function AIAssistantTeaser() {
  return (
    <section className="bg-night py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <CoordStamp label="Ask before you go" className="text-gold mb-3" />
          <h2 className="font-display text-3xl md:text-4xl text-sand mb-5">
            Your Karoo trip, planned in a conversation.
          </h2>
          <p className="text-sand/60 leading-relaxed mb-8 max-w-md">
            Ask the Prieska assistant about stargazing conditions, river
            activities, or where to stay with kids &mdash; it answers from live
            listings, 24/7, in English or Afrikaans.
          </p>
          <Button variant="gold">
            <Sparkles size={16} />
            Try the assistant
          </Button>
        </div>

        <div className="bg-panel rounded-2xl p-6 border border-sand/10">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-sand/10">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="text-sand/50 text-xs font-mono">Prieska Assistant</span>
          </div>
          <div className="space-y-4">
            <div className="bg-night rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm text-sand/80">
              Best spot for stargazing this weekend with clear skies?
            </div>
            <div className="bg-river/25 rounded-xl rounded-tr-sm px-4 py-3 max-w-[85%] ml-auto text-sm text-sand">
              New moon Saturday &mdash; Kareeboom Dark Sky Reserve has the least
              light interference. Two operators run guided sessions from
              19:30, both under R250pp.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
