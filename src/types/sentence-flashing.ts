export interface SentenceExercise {
  text: string;
  question: string;
  options: string[];
  answer: number;
}

export interface SentenceFlashingProps {
  level: number;
  onComplete: () => void;
}

export interface SentenceData {
  [key: number]: SentenceExercise[];
}