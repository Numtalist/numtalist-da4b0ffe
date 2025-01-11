import NumberRecognition from "../NumberRecognition";
import SequenceFlashing from "../SequenceFlashing";
import MathProblems from "../MathProblems";
import MissingNumbers from "../MissingNumbers";
import MemoryChallenge from "../MemoryChallenge";
import NumberComparison from "../NumberComparison";
import TimedCalculations from "../TimedCalculations";

interface ExerciseComponentProps {
  title: string;
  level: number;
  onComplete: () => void;
}

const ExerciseComponent = ({ title, level, onComplete }: ExerciseComponentProps) => {
  let Component;
  
  switch (title) {
    case "Number Recognition":
      Component = NumberRecognition;
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
    case "Memory Challenge":
      Component = MemoryChallenge;
      break;
    case "Number Comparison":
      Component = NumberComparison;
      break;
    case "Timed Calculations":
      Component = TimedCalculations;
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