import { Button } from "@/components/ui/button";

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  onSelect: (index: number) => void;
}

const AnswerOptions = ({ 
  options, 
  selectedAnswer, 
  isCorrect, 
  onSelect 
}: AnswerOptionsProps) => (
  <div className="grid gap-4">
    {options.map((option, index) => (
      <Button
        key={index}
        onClick={() => onSelect(index)}
        variant={
          selectedAnswer === index
            ? isCorrect === true
              ? "default"
              : "destructive"
            : "outline"
        }
        className="w-full py-6 text-lg"
        disabled={selectedAnswer !== null}
      >
        {option}
      </Button>
    ))}
  </div>
);

export default AnswerOptions;