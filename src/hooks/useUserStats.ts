import { useState, useCallback, useEffect } from 'react';
import type { UserStats } from '@/types';

const STORAGE_KEY = 'heritage-storyteller-stats';

const defaultStats: UserStats = {
  sitesExplored: 0,
  storiesListened: 0,
  quizzesCompleted: 0,
  heritageScore: 0,
  exploredSites: [],
  quizScores: {},
};

function loadStats(): UserStats {
  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserStats;
      return { ...defaultStats, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return defaultStats;
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(loadStats);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore storage errors
    }
  }, [stats]);

  const recordSiteExplored = useCallback((monumentId: string) => {
    setStats((prev) => {
      if (prev.exploredSites.includes(monumentId)) return prev;
      return {
        ...prev,
        sitesExplored: prev.sitesExplored + 1,
        exploredSites: [...prev.exploredSites, monumentId],
      };
    });
  }, []);

  const recordAudioListened = useCallback((monumentId: string) => {
    setStats((prev) => ({
      ...prev,
      storiesListened: prev.storiesListened + 1,
    }));
  }, []);

  const recordQuizCompletion = useCallback(
    (monumentId: string, score: number) => {
      setStats((prev) => {
        const previousScore = prev.quizScores[monumentId] ?? 0;
        const scoreDiff = score - previousScore;
        return {
          ...prev,
          quizzesCompleted: prev.quizzesCompleted + 1,
          heritageScore: Math.max(0, prev.heritageScore + scoreDiff),
          quizScores: { ...prev.quizScores, [monumentId]: score },
        };
      });
    },
    []
  );

  const resetStats = useCallback(() => {
    setStats(defaultStats);
  }, []);

  return {
    stats,
    recordSiteExplored,
    recordAudioListened,
    recordQuizCompletion,
    resetStats,
  };
}
