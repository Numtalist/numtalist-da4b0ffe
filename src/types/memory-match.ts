export interface MemoryMatchProps {
  level: number;
  onComplete: () => void;
}

export interface Exercise {
  word: string;
  options: string[];
  answer: number;
}

export interface LevelData {
  [key: number]: Exercise[];
}