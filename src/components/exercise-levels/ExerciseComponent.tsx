import NumberRecognition from "../NumberRecognition";
import SequenceFlashing from "../SequenceFlashing";
import MathProblems from "../MathProblems";
import MissingNumbers from "../MissingNumbers";
import LetterRecognition from "../LetterRecognition";
import WordFormation from "../WordFormation";
import SightWords from "../SightWords";
import SentenceFlashing from "../SentenceFlashing";
import MemoryMatch from "../MemoryMatch";

interface ExerciseComponentProps {
  title: string;
  level: number;
  onComplete: () => void;
}

const ExerciseComponent = ({ title, level, onComplete }: ExerciseComponentProps) => {
  let Component;
  
  switch (title) {
    case "Letter Recognition":
      Component = LetterRecognition;
      break;
    case "Word Formation":
      Component = WordFormation;
      break;
    case "Sequence Flashing":
      Component = SequenceFlashing;
      break;
    case "Math Problems":
      Component = MathProblems;
      break;
    case "Missing Numbers":
      Component = MissingNumbers;
      break;
    case "Sight Words":
      Component = SightWords;
      break;
    case "Sentence Flashing":
      Component = SentenceFlashing;
      break;
    case "Memory Match":
      Component = MemoryMatch;
      break;
    case "Number Recognition":
      Component = NumberRecognition;
      break;
    default:
      throw new Error(`Unknown exercise: ${title}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Component level={level} onComplete={onComplete} />
    </div>
  );
};

export default ExerciseComponent;