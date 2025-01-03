import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";
import { Card } from "@/components/ui/card";

interface MissingNumbersProps {
  level: number;
  onComplete: () => void;
}

const MissingNumbers = ({ level, onComplete }: MissingNumbersProps) => {
  const [sequence, setSequence] = useState<(number | null)[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [choices, setChoices] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const generateSequence = () => {
    const step = Math.floor(level / 2) + 1;
    const start = Math.max(1, Math.floor(Math.random() * 10));
    const sequence = [start, start + step, start + 2 * step];
    const missingIndex = Math.floor(Math.random() * 3);
    const answer = sequence[missingIndex];
    setCorrectAnswer(answer);
    sequence[missingIndex] = null;
    setSequence(sequence);
    setIsCorrect(null);
    
    // Generate choices including the correct answer
    let wrongChoices = [];
    while (wrongChoices.length < 3) {
      const wrongChoice = answer + Math.floor(Math.random() * 7) - 3; // Random number between answer-3 and answer+3
      if (wrongChoice !== answer && !wrongChoices.includes(wrongChoice)) {
        wrongChoices.push(wrongChoice);
      }
    }
    const allChoices = [...wrongChoices, answer];
    setChoices(shuffleArray(allChoices));
  };

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    setGameStarted(true);
    generateSequence();
  };

  useEffect(() => {
    if (gameStarted) {
      generateSequence();
    }
  }, [level]);

  const handleAnswer = (answer: number) => {
    if (isCorrect !== null) return;
    
    if (answer === correctAnswer) {
      setIsCorrect(true);
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next Level' to continue.",
      });
    } else {
      setIsCorrect(false);
      toast({
        title: "Think again! 🤔",
        description: "That's not the right answer. Try again!",
        variant: "destructive",
      });
    }
  };

  const handleNextLevel = () => {
    if (isCorrect) {
      onComplete();
    }
  };

  const handleTryAgain = () => {
    generateSequence();
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Missing Numbers</h2>
          <p className="text-gray-600">Find the missing number in the sequence.</p>
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
        <h2 className="text-2xl font-bold mb-2">Missing Numbers</h2>
        <p className="text-gray-600">What's the missing number?</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-3xl text-center mb-8 font-mono">
          {sequence.map((num, index) => (
            <span key={index}>
              {num === null ? "__" : num}
              {index < sequence.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {choices.map((choice, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isCorrect !== null
                  ? choice === correctAnswer
                    ? "bg-green-100"
                    : "bg-gray-100"
                  : "hover:bg-orange-50"
              }`}
              onClick={() => handleAnswer(choice)}
            >
              <p className="text-2xl text-center font-bold">{choice}</p>
            </Card>
          ))}
        </div>
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
            onClick={handleNextLevel}
            className="mt-4"
          >
            Next Level
          </Button>
        </div>
      )}
    </div>
  );
};

export default MissingNumbers;