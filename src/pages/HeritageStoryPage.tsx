import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Sparkles,
  Images,
  Headphones,
  HelpCircle,
  Calendar,
  Heart,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  Camera,
} from 'lucide-react';
import type { Monument, Page } from '@/types';
import { useAudioNarration } from '@/hooks/useAudioNarration';
import { useUserStats } from '@/hooks/useUserStats';

interface HeritageStoryPageProps {
  monument: Monument;
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

type StorySection = 'story' | 'timeline' | 'gallery' | 'audio' | 'quiz' | 'cultural';

const iconMap: Record<string, typeof Building2> = {
  flag: Building2,
  building: Building2,
  zap: Sparkles,
  wind: Clock,
  award: Award,
  camera: Camera,
  crown: Award,
  heart: Heart,
  eye: Sparkles,
};

export default function HeritageStoryPage({
  monument,
  onNavigate,
  onBack,
}: HeritageStoryPageProps) {
  const [activeSection, setActiveSection] = useState<StorySection>('story');
  const { stats, recordQuizCompletion, recordAudioListened } = useUserStats();
  const audio = useAudioNarration(monument.aiStory.join(' '));

  const handleAudioPlay = () => {
    if (audio.isPlaying) {
      audio.pause();
    } else {
      audio.play();
      recordAudioListened(monument.id);
    }
  };

  const handleQuizComplete = (score: number) => {
    recordQuizCompletion(monument.id, score);
  };

  const sections: { id: StorySection; label: string; icon: typeof BookOpen }[] = [
    { id: 'story', label: 'AI Story', icon: BookOpen },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Images },
    { id: 'audio', label: 'Audio Story', icon: Headphones },
    { id: 'quiz', label: 'Heritage Quiz', icon: HelpCircle },
    { id: 'cultural', label: 'Cultural Connection', icon: Heart },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={monument.heroImage}
          alt={monument.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-800/50 to-transparent" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-parchment-50/90 backdrop-blur-sm text-navy-700 font-medium text-sm hover:bg-parchment-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {monument.tags.map((tag) => (
                <span key={tag} className="badge bg-gold-400/90 text-navy-800">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-parchment-50 mb-2">
              {monument.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-parchment-200">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {monument.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {monument.period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick info bar */}
      <div className="bg-parchment-100 border-b border-parchment-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-terracotta-500 shrink-0 mt-0.5" />
            <p className="text-sm text-navy-600 leading-relaxed">{monument.construction}</p>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="sticky top-16 z-40 bg-parchment-50/90 backdrop-blur-md border-b border-parchment-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === id
                    ? 'bg-navy-600 text-parchment-50 shadow-sm'
                    : 'text-navy-500 hover:bg-navy-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'story' && <StorySection monument={monument} />}
        {activeSection === 'timeline' && <TimelineSection monument={monument} />}
        {activeSection === 'gallery' && <GallerySection monument={monument} />}
        {activeSection === 'audio' && (
          <AudioSection
            monument={monument}
            isPlaying={audio.isPlaying}
            onToggle={handleAudioPlay}
            progress={audio.progress}
            isSupported={audio.isSupported}
          />
        )}
        {activeSection === 'quiz' && (
          <QuizSection monument={monument} onComplete={handleQuizComplete} />
        )}
        {activeSection === 'cultural' && <CulturalSection monument={monument} />}
      </div>

      {/* Dashboard link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full card card-hover p-4 flex items-center justify-center gap-2 text-navy-600 hover:text-teal-600 transition-colors"
        >
          <Award className="w-5 h-5" />
          <span className="font-medium">View Your Heritage Dashboard</span>
        </button>
      </div>
    </div>
  );
}

/* ============ AI STORY ============ */
function StorySection({ monument }: { monument: Monument }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-teal-600" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-navy-700">AI Story</h2>
        <span className="badge bg-gold-100 text-gold-700 ml-auto">Sample Content</span>
      </div>

      <div className="space-y-6">
        {monument.aiStory.map((paragraph, i) => (
          <p
            key={i}
            className="text-lg leading-relaxed text-navy-600 font-serif animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 card p-4 flex items-start gap-3 bg-parchment-100">
        <Sparkles className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
        <p className="text-sm text-navy-500">
          <span className="font-medium text-navy-700">AI-Generated Narrative:</span> This story
          is generated from verified historical data. In the production version, an AI model
          would generate personalized narratives. Historical facts should be verified with
          authoritative sources.
        </p>
      </div>
    </div>
  );
}

/* ============ TIMELINE ============ */
function TimelineSection({ monument }: { monument: Monument }) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(
    monument.timeline[0]?.id ?? null
  );

  const selected = monument.timeline.find((e) => e.id === selectedEvent);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="section-title">Interactive Timeline</h2>
        <div className="ornament-line max-w-xs mx-auto mt-2" />
        <p className="text-navy-500 mt-3 text-sm">
          Click on any event to see details
        </p>
      </div>

      {/* Horizontal timeline */}
      <div className="relative mb-8 overflow-x-auto pb-4">
        <div className="flex gap-2 min-w-max px-2">
          {monument.timeline.map((event) => {
            const Icon = iconMap[event.icon] ?? Clock;
            const isSelected = event.id === selectedEvent;
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={`flex flex-col items-center group min-w-[120px] transition-all ${
                  isSelected ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isSelected
                      ? 'bg-navy-600 text-parchment-50 shadow-lg shadow-navy-600/30'
                      : 'bg-parchment-200 text-navy-500 group-hover:bg-parchment-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold ${isSelected ? 'text-navy-700' : 'text-navy-400'}`}>
                  {event.year}
                </span>
                <span className={`text-xs text-center mt-0.5 ${isSelected ? 'text-navy-600' : 'text-navy-400'}`}>
                  {event.title}
                </span>
              </button>
            );
          })}
        </div>
        {/* Timeline line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-navy-200 via-gold-300 to-navy-200 -z-10" />
      </div>

      {/* Selected event detail */}
      {selected && (
        <div className="card p-6 animate-fade-in-up max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="badge bg-gold-100 text-gold-700 text-sm">{selected.year}</span>
            <h3 className="font-display text-xl font-semibold text-navy-700">{selected.title}</h3>
          </div>
          <p className="text-navy-600 leading-relaxed">{selected.description}</p>
        </div>
      )}
    </div>
  );
}

/* ============ GALLERY ============ */
function GallerySection({ monument }: { monument: Monument }) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="section-title">Heritage Gallery</h2>
        <div className="ornament-line max-w-xs mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monument.galleryImages.map((img, i) => (
          <div
            key={i}
            className="card card-hover overflow-hidden group animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <span className="badge bg-navy-800/80 text-parchment-50 text-xs">
                  {img.period}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold text-navy-700 mb-1">
                {img.title}
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed">{img.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ AUDIO ============ */
function AudioSection({
  monument,
  isPlaying,
  onToggle,
  progress,
  isSupported,
}: {
  monument: Monument;
  isPlaying: boolean;
  onToggle: () => void;
  progress: number;
  isSupported: boolean;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="section-title">Audio Story</h2>
        <div className="ornament-line max-w-xs mx-auto mt-2" />
        <p className="text-navy-500 mt-3 text-sm">
          Listen to the heritage story narrated by AI
        </p>
      </div>

      <div className="card p-8 bg-gradient-to-br from-navy-700 to-navy-800 text-parchment-50 border-none">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onToggle}
            className="w-16 h-16 rounded-full bg-gold-400 text-navy-800 flex items-center justify-center hover:bg-gold-500 transition-all active:scale-95 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" fill="currentColor" />
            ) : (
              <Play className="w-7 h-7 ml-1" fill="currentColor" />
            )}
          </button>
          <div>
            <h3 className="font-display text-xl font-semibold text-parchment-50">
              {monument.name}
            </h3>
            <p className="text-sm text-parchment-300">AI Narration</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-navy-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-gold-300 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-parchment-300 mt-1">
            <span>{Math.round((progress / 100) * 100)}%</span>
            <span>{isPlaying ? 'Playing...' : 'Paused'}</span>
          </div>
        </div>

        {!isSupported && (
          <div className="mt-4 p-3 rounded-lg bg-terracotta-500/20 border border-terracotta-400/30">
            <p className="text-sm text-terracotta-200">
              Text-to-speech is not supported in this browser. The audio story uses browser
              speech synthesis — try Chrome or Edge for the best experience.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-navy-600">
          <p className="text-xs text-parchment-300">
            Narrated using browser text-to-speech (Web Speech API). In production, professional
            voice narration would be used.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============ QUIZ ============ */
function QuizSection({
  monument,
  onComplete,
}: {
  monument: Monument;
  onComplete: (score: number) => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = monument.quiz[currentQ];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setSubmitted(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < monument.quiz.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
      setFinished(true);
      onComplete(finalScore);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-8 animate-fade-in-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold-100 flex items-center justify-center mb-4">
            <Award className="w-10 h-10 text-gold-500" />
          </div>
          <h2 className="font-display text-3xl font-bold text-navy-700 mb-2">
            Your Heritage Score
          </h2>
          <p className="text-5xl font-display font-bold text-teal-600 mb-2">
            {score}/{monument.quiz.length}
          </p>
          <p className="text-navy-500 mb-6">
            {score === monument.quiz.length
              ? 'Perfect! You are a heritage expert!'
              : score >= 3
              ? 'Well done! You know your heritage well.'
              : 'Keep exploring to learn more about this monument.'}
          </p>

          <div className="flex gap-3 justify-center">
            <button onClick={handleRestart} className="btn-ghost">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="section-title">Heritage Quiz</h2>
        <div className="ornament-line max-w-xs mx-auto mt-2" />
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-navy-400">
          Question {currentQ + 1} of {monument.quiz.length}
        </span>
        <span className="text-sm font-medium text-teal-600">Score: {score}</span>
      </div>
      <div className="h-1.5 bg-parchment-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-teal-500 rounded-full transition-all"
          style={{ width: `${((currentQ + 1) / monument.quiz.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="card p-6 animate-fade-in">
        <h3 className="font-display text-xl font-semibold text-navy-700 mb-4">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === question.correctAnswer;
            let className = 'border-2 border-parchment-300 bg-white/50 text-navy-700 hover:border-teal-400 hover:bg-teal-50';

            if (submitted) {
              if (isCorrect) {
                className = 'border-2 border-teal-500 bg-teal-50 text-teal-700';
              } else if (isSelected) {
                className = 'border-2 border-terracotta-500 bg-terracotta-50 text-terracotta-700';
              } else {
                className = 'border-2 border-parchment-200 bg-white/30 text-navy-400';
              }
            } else if (isSelected) {
              className = 'border-2 border-navy-500 bg-navy-50 text-navy-700';
            }

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelectedAnswer(i)}
                disabled={submitted}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${className}`}
              >
                <span className="font-medium">{option}</span>
                {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-teal-600" />}
                {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-terracotta-600" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div className="mt-4 p-4 rounded-lg bg-parchment-100 animate-fade-in">
            <p className="text-sm text-navy-600">
              <span className="font-semibold text-navy-700">
                {selectedAnswer === question.correctAnswer ? 'Correct! ' : 'Not quite. '}
              </span>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              {currentQ < monument.quiz.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ CULTURAL CONNECTION ============ */
function CulturalSection({ monument }: { monument: Monument }) {
  const connections = [
    { key: 'architecture', label: 'Architecture', icon: Building2, color: 'navy' },
    { key: 'culture', label: 'Culture', icon: Heart, color: 'terracotta' },
    { key: 'society', label: 'Society', icon: Users, color: 'gold' },
    { key: 'education', label: 'Education', icon: GraduationCap, color: 'teal' },
    { key: 'tourism', label: 'Tourism', icon: Camera, color: 'navy' },
  ] as const;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="section-title">Cultural Connection</h2>
        <div className="ornament-line max-w-xs mx-auto mt-2" />
        <p className="text-navy-500 mt-3 text-lg">
          Why does this heritage matter today?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map(({ key, label, icon: Icon, color }, i) => (
          <div
            key={key}
            className="card card-hover p-6 animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-navy-700">{label}</h3>
            </div>
            <p className="text-sm text-navy-600 leading-relaxed">
              {monument.culturalConnection[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
