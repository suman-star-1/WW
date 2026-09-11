import { ScanLine, Compass, Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getFeaturedMonuments } from '@/data/monuments';
import type { Page, Monument } from '@/types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectMonument: (monument: Monument) => void;
}

export default function HomePage({ onNavigate, onSelectMonument }: HomePageProps) {
  const featured = getFeaturedMonuments();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-800 text-parchment-50">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/16892575/pexels-photo-16892575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-800/70 to-navy-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/20 border border-gold-400/30 text-gold-200 text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Heritage Exploration</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4">
              AI Heritage Storyteller
            </h1>
            <p className="font-display text-2xl md:text-3xl text-gold-200 mb-6">
              Bringing Local History to Life
            </p>
            <p className="text-lg md:text-xl text-parchment-200 mb-10 max-w-2xl leading-relaxed">
              Scan. Explore. Learn. Preserve. — Experience India's rich heritage through
              interactive storytelling, AI-powered identification, and immersive multimedia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('scan')}
                className="btn-gold flex items-center justify-center gap-2 group"
              >
                <ScanLine className="w-5 h-5" />
                Scan Heritage Site
              </button>
              <button
                onClick={() => onNavigate('search')}
                className="px-6 py-3 rounded-lg border-2 border-parchment-200/40 text-parchment-50 font-medium transition-all duration-300 hover:border-gold-300 hover:bg-parchment-50/10 active:scale-95 flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5" />
                Explore Heritage
              </button>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="relative h-12 bg-parchment-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 30%, 0 0)' }} />
      </section>

      {/* Architecture layers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="section-title mb-2">Architecture</h2>
          <div className="ornament-line max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Frontend', color: 'navy' },
            { label: 'Heritage Identification', color: 'teal' },
            { label: 'Historical Knowledge DB', color: 'gold' },
            { label: 'AI Story Generation', color: 'terracotta' },
            { label: 'Multimedia Layer', color: 'navy' },
            { label: 'Interactive Learning', color: 'teal' },
          ].map((layer, i) => (
            <div
              key={layer.label}
              className={`card p-4 text-center animate-fade-in-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-${layer.color}-500/20 flex items-center justify-center`}>
                <span className={`text-${layer.color}-600 font-bold text-sm`}>{i + 1}</span>
              </div>
              <p className="text-xs font-medium text-navy-600">{layer.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured sites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Heritage Sites</h2>
            <div className="ornament-line max-w-xs mt-2" />
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((monument, i) => (
            <button
              key={monument.id}
              onClick={() => onSelectMonument(monument)}
              className="card card-hover overflow-hidden text-left group animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={monument.heroImage}
                  alt={monument.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex flex-wrap gap-1">
                    {monument.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="badge bg-gold-400/90 text-navy-800 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-navy-700 mb-1 group-hover:text-teal-600 transition-colors">
                  {monument.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-navy-400 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{monument.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-navy-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{monument.period}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-8 md:p-12 text-center bg-gradient-to-br from-navy-700 to-navy-800 text-parchment-50 border-none">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-gold-200">
            Ready to Explore?
          </h2>
          <p className="text-parchment-200 mb-8 max-w-2xl mx-auto">
            Start by scanning a monument with your camera, or search through our database of
            India's most significant heritage sites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('scan')} className="btn-gold flex items-center justify-center gap-2">
              <ScanLine className="w-5 h-5" />
              Scan Heritage Site
            </button>
            <button onClick={() => onNavigate('search')} className="px-6 py-3 rounded-lg border-2 border-parchment-200/40 text-parchment-50 font-medium transition-all hover:border-gold-300 hover:bg-parchment-50/10 active:scale-95 flex items-center justify-center gap-2">
              <Compass className="w-5 h-5" />
              Search Heritage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
