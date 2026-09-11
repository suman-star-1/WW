import { useState } from 'react';
import { ScanLine, Camera, Search, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { getMonumentById } from '@/data/monuments';
import type { Page, Monument } from '@/types';

interface ScanPageProps {
  onNavigate: (page: Page) => void;
  onIdentified: (monument: Monument) => void;
}

type ScanState = 'idle' | 'scanning' | 'identified';

export default function ScanPage({ onNavigate, onIdentified }: ScanPageProps) {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const identifiedMonument = getMonumentById('qutub-minar');

  const handleSimulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('identified');
    }, 3000);
  };

  const handleViewStory = () => {
    if (identifiedMonument) {
      onIdentified(identifiedMonument);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="section-title mb-2">Scan Heritage Site</h1>
        <div className="ornament-line max-w-xs mx-auto" />
        <p className="text-navy-500 mt-4">
          Point your camera at a heritage monument to identify it instantly
        </p>
      </div>

      {/* Camera viewport */}
      <div className="relative aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden bg-navy-900 border-4 border-navy-700 shadow-xl">
        {/* Simulated camera background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/16892575/pexels-photo-16892575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)',
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-parchment-50/10" />
          ))}
        </div>

        {/* Corner brackets */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-gold-300 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-gold-300 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-gold-300 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-gold-300 rounded-br-lg" />

        {/* Scanning line */}
        {scanState === 'scanning' && (
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-scan-line shadow-[0_0_20px_rgba(63,174,159,0.8)]" />
        )}

        {/* Idle state */}
        {scanState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-parchment-50">
            <div className="relative mb-6">
              <Camera className="w-20 h-20 text-parchment-50/60" />
              {scanState === 'idle' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-pulse-ring" />
                  <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </div>
            <p className="text-lg font-medium text-parchment-100">Point your camera at a heritage monument</p>
            <p className="text-sm text-parchment-300 mt-1">Camera ready — waiting to scan</p>
          </div>
        )}

        {/* Scanning state */}
        {scanState === 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-parchment-50">
            <div className="flex items-center gap-3 mb-4">
              <ScanLine className="w-8 h-8 text-teal-400 animate-pulse" />
              <span className="text-xl font-medium">Scanning...</span>
            </div>
            <div className="w-64 h-2 bg-navy-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-gold-300 animate-shimmer rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="text-sm text-parchment-300 mt-4">Analyzing visual features...</p>
          </div>
        )}

        {/* Identified state */}
        {scanState === 'identified' && identifiedMonument && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900/80 backdrop-blur-sm text-parchment-50 animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-teal-400 mb-4" />
            <p className="text-sm text-teal-300 font-medium uppercase tracking-wider mb-2">Identified</p>
            <h2 className="font-display text-4xl font-bold mb-2">{identifiedMonument.name}</h2>
            <p className="text-parchment-200 mb-4">{identifiedMonument.location}</p>

            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span className="text-sm text-parchment-200">Identification confidence: </span>
              <span className="text-lg font-bold text-gold-300">96%</span>
            </div>

            <button
              onClick={handleViewStory}
              className="btn-gold flex items-center gap-2"
            >
              View Heritage Story
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      {scanState !== 'identified' && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleSimulateScan}
            disabled={scanState === 'scanning'}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ScanLine className="w-5 h-5" />
            {scanState === 'scanning' ? 'Scanning...' : 'Simulate Scan'}
          </button>
          <button
            onClick={() => onNavigate('search')}
            className="btn-ghost flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search Instead
          </button>
        </div>
      )}

      {scanState === 'identified' && (
        <div className="text-center mt-6">
          <button
            onClick={() => setScanState('idle')}
            className="text-sm text-navy-500 hover:text-navy-700 transition-colors"
          >
            Scan another monument
          </button>
        </div>
      )}

      {/* Info note */}
      <div className="mt-10 card p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-teal-600" />
        </div>
        <p className="text-sm text-navy-500">
          <span className="font-medium text-navy-700">Prototype Mode:</span> The scan simulation
          identifies the Qutub Minar as a demonstration. In the production version, a real AI vision
          model would identify any monument from the camera feed.
        </p>
      </div>
    </div>
  );
}
