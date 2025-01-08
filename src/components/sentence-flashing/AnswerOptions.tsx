import { Button } from "@/components/ui/button";

interface AnswerOptionsProps {
  options: string[];
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  onSelect: (index: number) => void;
}

const AnswerOptions = ({ options, selectedAnswer, isCorrect, onSelect }: AnswerOptionsProps) => (
  <div className="grid gap-4">
    {options.map((option, index) => (
      <Button
        key={index}
        onClick={() => onSelect(index)}
        variant={
          selectedAnswer === index
            ? isCorrect
              ? "default"
              : "destructive"
            : "outline"
        }
        className={`w-full py-6 text-lg ${
          selectedAnswer === index && isCorrect && "bg-green-500"
        }`}
        disabled={selectedAnswer !== null && selectedAnswer !== index}
      >
        {option}
      </Button>
    ))}
  </div>
);

export default AnswerOptions;