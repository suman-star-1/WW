import { useState } from 'react';
import { Search, MapPin, Clock, ArrowRight } from 'lucide-react';
import { monuments } from '@/data/monuments';
import type { Monument } from '@/types';

interface SearchPageProps {
  onSelectMonument: (monument: Monument) => void;
}

export default function SearchPage({ onSelectMonument }: SearchPageProps) {
  const [query, setQuery] = useState('');

  const filtered = monuments.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.location.toLowerCase().includes(query.toLowerCase()) ||
      m.state.toLowerCase().includes(query.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="section-title mb-2">Explore Heritage</h1>
        <div className="ornament-line max-w-xs mx-auto" />
        <p className="text-navy-500 mt-4">
          Search a monument, place or personality...
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a monument, place or personality..."
          className="input-field pl-12 text-lg"
          autoFocus
        />
      </div>

      {/* Sample suggestions */}
      {!query && (
        <div className="mb-6">
          <p className="text-sm text-navy-400 mb-3">Try searching for:</p>
          <div className="flex flex-wrap gap-2">
            {monuments.map((m) => (
              <button
                key={m.id}
                onClick={() => setQuery(m.name)}
                className="badge bg-parchment-100 text-navy-600 border border-parchment-300 hover:bg-parchment-200 hover:border-gold-400 transition-all cursor-pointer"
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-navy-400 text-lg">No monuments found for "{query}"</p>
            <p className="text-sm text-navy-300 mt-2">Try a different search term.</p>
          </div>
        ) : (
          filtered.map((monument, i) => (
            <button
              key={monument.id}
              onClick={() => onSelectMonument(monument)}
              className="card card-hover w-full overflow-hidden text-left group flex flex-col sm:flex-row animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="sm:w-48 h-32 sm:h-auto shrink-0 overflow-hidden">
                <img
                  src={monument.heroImage}
                  alt={monument.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="font-display text-xl font-semibold text-navy-700 mb-1 group-hover:text-teal-600 transition-colors">
                  {monument.name}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-navy-400 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {monument.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {monument.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {monument.tags.map((tag) => (
                    <span key={tag} className="badge bg-teal-50 text-teal-600 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center pr-4">
                <ArrowRight className="w-5 h-5 text-navy-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
