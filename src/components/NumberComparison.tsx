import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface NumberComparisonProps {
  level: number;
  onComplete: () => void;
}

const NumberComparison = ({ level, onComplete }: NumberComparisonProps) => {
  const [numbers, setNumbers] = useState<[number, number]>([0, 0]);
  const [isLargerQuestion, setIsLargerQuestion] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const generateNumbers = () => {
    const maxNumber = Math.min(10 + level * 5, 100);
    let num1 = Math.floor(Math.random() * maxNumber) + 1;
    let num2;
    do {
      num2 = Math.floor(Math.random() * maxNumber) + 1;
    } while (num1 === num2);
    
    setNumbers([num1, num2]);
    setIsLargerQuestion(Math.random() > 0.5);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const startGame = () => {
    setGameStarted(true);
    generateNumbers();
  };

  const handleAnswerSelect = (selectedNumber: number) => {
    const correctAnswer = isLargerQuestion
      ? Math.max(...numbers)
      : Math.min(...numbers);
    
    const correct = selectedNumber === correctAnswer;
    setSelectedAnswer(selectedNumber);
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next Level' to continue.",
      });
    } else {
      toast({
        title: "Think again! 🤔",
        description: "That's not the right answer. Try again!",
        variant: "destructive",
      });
    }
  };

  const handleTryAgain = () => {
    generateNumbers();
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Number Comparison</h2>
          <p className="text-gray-600">Choose the {isLargerQuestion ? "larger" : "smaller"} number.</p>
        </div>
        <Button onClick={startGame} size="lg">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-4 relative">
        <LevelDisplay level={level} />
        <h2 className="text-2xl font-bold mb-2">Number Comparison</h2>
        <p className="text-gray-600">Which number is {isLargerQuestion ? "larger" : "smaller"}?</p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full max-w-[400px]">
        {numbers.map((number, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerSelect(number)}
            variant={
              selectedAnswer === number
                ? isCorrect
                  ? "default"
                  : "destructive"
                : "outline"
            }
            className={`h-24 text-4xl ${
              selectedAnswer === number && isCorrect && "bg-green-500"
            }`}
            disabled={isCorrect !== null}
          >
            {number}
          </Button>
        ))}
      </div>

      {isCorrect === false && (
        <Button 
          onClick={handleTryAgain}
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
            onClick={onComplete}
            className="mt-4"
          >
            Next Level
          </Button>
        </div>
      )}
    </div>
  );
};

export default NumberComparison;