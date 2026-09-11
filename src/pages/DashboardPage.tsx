import {
  Compass,
  Headphones,
  HelpCircle,
  Award,
  TrendingUp,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';
import { monuments } from '@/data/monuments';
import type { Page, Monument } from '@/types';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onSelectMonument: (monument: Monument) => void;
}

export default function DashboardPage({ onNavigate, onSelectMonument }: DashboardPageProps) {
  const { stats, resetStats } = useUserStats();

  const exploredMonuments = monuments.filter((m) =>
    stats.exploredSites.includes(m.id)
  );

  const statCards = [
    {
      label: 'Heritage Sites Explored',
      value: stats.sitesExplored,
      icon: Compass,
      color: 'navy',
      bg: 'bg-navy-600',
    },
    {
      label: 'Stories Listened',
      value: stats.storiesListened,
      icon: Headphones,
      color: 'teal',
      bg: 'bg-teal-500',
    },
    {
      label: 'Quizzes Completed',
      value: stats.quizzesCompleted,
      icon: HelpCircle,
      color: 'gold',
      bg: 'bg-gold-400',
    },
    {
      label: 'Heritage Score',
      value: stats.heritageScore,
      icon: Award,
      color: 'terracotta',
      bg: 'bg-terracotta-500',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Your Heritage Dashboard</h1>
          <div className="ornament-line max-w-xs mt-2" />
        </div>
        {stats.sitesExplored > 0 && (
          <button
            onClick={resetStats}
            className="text-sm text-navy-400 hover:text-terracotta-500 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className="card p-5 animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-3xl font-display font-bold text-navy-700 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-navy-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Most explored sites */}
      <div className="card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <h2 className="font-display text-xl font-semibold text-navy-700">
            Most Explored Heritage Sites
          </h2>
        </div>

        {exploredMonuments.length === 0 ? (
          <div className="text-center py-8">
            <Compass className="w-12 h-12 text-navy-200 mx-auto mb-3" />
            <p className="text-navy-400 mb-4">
              You haven't explored any heritage sites yet.
            </p>
            <button
              onClick={() => onNavigate('search')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {exploredMonuments.map((m, i) => {
              const quizScore = stats.quizScores[m.id];
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMonument(m)}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-parchment-100 transition-colors text-left group"
                >
                  <span className="text-2xl font-display font-bold text-navy-200 w-8">
                    {i + 1}
                  </span>
                  <img
                    src={m.heroImage}
                    alt={m.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-navy-700 group-hover:text-teal-600 transition-colors">
                      {m.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-navy-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {m.location}
                    </div>
                  </div>
                  {quizScore !== undefined && (
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-teal-600">
                        <Award className="w-4 h-4" />
                        <span className="font-semibold">{quizScore}/5</span>
                      </div>
                      <p className="text-xs text-navy-400">Quiz Score</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quiz scores breakdown */}
      {Object.keys(stats.quizScores).length > 0 && (
        <div className="card p-6">
          <h2 className="font-display text-xl font-semibold text-navy-700 mb-4">
            Quiz Performance
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.quizScores).map(([monumentId, score]) => {
              const monument = monuments.find((m) => m.id === monumentId);
              if (!monument) return null;
              const pct = (score / 5) * 100;
              return (
                <div key={monumentId}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-navy-600">
                      {monument.name}
                    </span>
                    <span className="text-sm font-semibold text-teal-600">
                      {score}/5
                    </span>
                  </div>
                  <div className="h-2 bg-parchment-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct >= 80
                          ? 'bg-teal-500'
                          : pct >= 60
                          ? 'bg-gold-400'
                          : 'bg-terracotta-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-6 text-center">
        <button
          onClick={() => onNavigate('search')}
          className="btn-ghost inline-flex items-center gap-2"
        >
          <Compass className="w-5 h-5" />
          Explore More Heritage Sites
        </button>
      </div>
    </div>
  );
}
