import { useState, useMemo } from 'react';
import { SLIDER_CARDS, DEFAULT_SPIRAL_CONFIG } from './data/sliderData';
import type { SliderCard, SpiralConfig } from './data/sliderData';
import { Header } from './components/Header';
import { SpiralSlider } from './components/SpiralSlider';
import { CodePromptModal } from './components/CodePromptModal';
import { CardDetailModal } from './components/CardDetailModal';
import { CinematicIntro } from './components/CinematicIntro';
import { AiImpactSection } from './components/AiImpactSection';
import { MetricsCounterSection } from './components/MetricsCounterSection';
import { ContactSection } from './components/ContactSection';
import { RisingSlideCardsSection } from './components/RisingSlideCardsSection';
import { SapServicesSection } from './components/SapServicesSection';
import { AiServicesSection } from './components/AiServicesSection';
import { FloatingServicesPopup } from './components/FloatingServicesPopup';
import { SapProjectsLedger } from './components/SapProjectsLedger';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('Home');
  const [cards, setCards] = useState<SliderCard[]>(SLIDER_CARDS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [config, setConfig] = useState<SpiralConfig>(DEFAULT_SPIRAL_CONFIG);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<SliderCard | null>(null);
  const [codeModalCard, setCodeModalCard] = useState<SliderCard | null>(null);
  // Filter cards by search term
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [cards, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-800">
      {/* Full-Screen Cinematic Intro Animation */}
      {showIntro && (
        <CinematicIntro
          onComplete={() => setShowIntro(false)}
          onSkip={() => setShowIntro(false)}
        />
      )}

      {/* Navigation Header */}
      <Header
        activePage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleCustomizer={() => setIsCustomizerOpen(!isCustomizerOpen)}
        onPlayIntro={() => setShowIntro(true)}
      />

      {/* Conditional Page Views */}
      {currentPage === 'Contact' ? (
        /* SEPARATE DEDICATED CONTACT US PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <ContactSection />
        </main>
      ) : currentPage === 'Projects' ? (
        /* SEPARATE DEDICATED PROJECTS PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <SapProjectsLedger />
        </main>
      ) : currentPage === 'SAP' || currentPage === 'Services' || currentPage === 'Solutions' ? (
        /* DEDICATED SAP SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <SapServicesSection
            onContactClick={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentPage === 'AI' || currentPage === 'ai-services' || currentPage === '/ai-services' ? (
        /* DEDICATED AI & DATA ANALYTICS SERVICES PAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          <AiServicesSection
            onContactClick={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        /* MAIN HOME PAGE & 3D SPIRAL STAGE */
        <main className="w-full flex-1 flex flex-col items-center">
          {/* Title Hero Banner */}
          <div className="pt-8 pb-2 px-4 text-center flex flex-col items-center gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-600 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>CLYPTUS COMPONENT #C-SPIRAL-SLIDER</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
              AI Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">Solutions</span> That Change Your Business
            </h1>
          </div>

          {/* 3D Spiral Slider Stage (Full Width Edge-to-Edge) */}
          <div className="w-full">
            {filteredCards.length > 0 ? (
              <SpiralSlider
                cards={filteredCards}
                config={config}
                onSelectCard={(card) => setSelectedCard(card)}
                onOpenPromptModal={(card) => setCodeModalCard(card)}
              />
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center gap-3 text-slate-400">
                <p className="text-base font-semibold">No 3D presets match "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 transition-all"
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>

          {/* Metrics Counter Animated Section */}
          <MetricsCounterSection />

          {/* AI Scroll-Driven Zoom Typography Section ("AI IS CHANGING HOW WE WORK.") */}
          <AiImpactSection />

          {/* 5 Feature Cards Animated Section (Right-Bottom -> Up -> Slide Left) */}
          <RisingSlideCardsSection />
        </main>
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onOpenCodeModal={(card) => {
            setSelectedCard(null);
            setCodeModalCard(card);
          }}
        />
      )}

      {/* AI Prompt & Code Generator Modal */}
      {codeModalCard && (
        <CodePromptModal
          card={codeModalCard}
          config={config}
          onClose={() => setCodeModalCard(null)}
        />
      )}

      {/* Floating Services Launcher (Homepage Only) */}
      {currentPage === 'Home' && (
        <FloatingServicesPopup
          onSelectService={(serviceId) => {
            setCurrentPage(serviceId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
}

export default App;
