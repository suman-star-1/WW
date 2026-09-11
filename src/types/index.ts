export interface Monument {
  id: string;
  name: string;
  location: string;
  state: string;
  period: string;
  construction: string;
  significance: string;
  heroImage: string;
  galleryImages: GalleryImage[];
  aiStory: string[];
  timeline: TimelineEvent[];
  quiz: QuizQuestion[];
  culturalConnection: CulturalConnection;
  tags: string[];
  featured?: boolean;
}

export interface GalleryImage {
  title: string;
  description: string;
  period: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CulturalConnection {
  architecture: string;
  culture: string;
  society: string;
  education: string;
  tourism: string;
}

export interface Contribution {
  id: string;
  monumentName: string;
  contributorName: string;
  type: 'story' | 'photo' | 'history' | 'audio';
  title: string;
  description: string;
  status: 'pending' | 'verified' | 'rejected';
  date: string;
}

export interface UserStats {
  sitesExplored: number;
  storiesListened: number;
  quizzesCompleted: number;
  heritageScore: number;
  exploredSites: string[];
  quizScores: Record<string, number>;
}

export type Page =
  | 'home'
  | 'scan'
  | 'search'
  | 'story'
  | 'admin'
  | 'dashboard';
