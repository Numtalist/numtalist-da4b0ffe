import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackSectionProps {
  isCorrect: boolean | null;
  onTryAgain: () => void;
  onNextLevel: () => void;
  isLastSentence: boolean;
}

const FeedbackSection = ({ isCorrect, onTryAgain, onNextLevel, isLastSentence }: FeedbackSectionProps) => (
  <>
    {isCorrect === false && (
      <Button 
        onClick={onTryAgain}
        variant="secondary"
        className="mt-4"
      >
        Try Again
      </Button>
    )}

    {isCorrect && (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Check className="text-green-500" />
          <span>Correct!</span>
        </div>
        <Button 
          onClick={onNextLevel}
          className="mt-4"
        >
          {isLastSentence ? "Complete Level" : "Next Sentence"}
        </Button>
      </div>
    )}
  </>
);

export default FeedbackSection;