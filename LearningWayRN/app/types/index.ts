export interface VarkQuestion {
  id: string;
  question: string;
  options: VarkOption[];
}

export interface VarkOption {
  id: string;
  text: string;
  style: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
}

export interface VarkResults {
  visual: number;
  auditory: number;
  reading: number;
  kinesthetic: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  content: TopicContent;
}

export interface TopicContent {
  visual: LearningModule;
  auditory: LearningModule;
  reading: LearningModule;
  kinesthetic: LearningModule;
}

export interface LearningModule {
  id: string;
  title: string;
  content: string;
  interactiveElements?: InteractiveElement[];
  audioUrl?: string;
  transcript?: string;
  testQuestions: TestQuestion[];
}

export interface InteractiveElement {
  type: 'drag-drop' | 'button-click' | 'note-taking';
  id: string;
  data: any;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice';
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  notes?: string;
}

export interface AssessmentProgress {
  selectedTopic?: string;
  varkCompleted: boolean;
  varkResults?: VarkResults;
  moduleProgress: Record<string, ModuleProgress>;
  completed: boolean;
  finalResults?: FinalResults;
}

export interface FinalResults {
  primaryLearningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  varkScores: VarkResults;
  performanceScores: Record<string, number>;
  recommendations: Recommendation[];
  completedAt: Date;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
}

export type LearningStyle = 'visual' | 'auditory' | 'reading' | 'kinesthetic';

export interface ScreenProps {
  navigation: any;
  route?: any;
}