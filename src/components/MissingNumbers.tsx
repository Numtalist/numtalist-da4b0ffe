import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface MissingNumbersProps {
  level: number;
  onComplete: () => void;
}

const MissingNumbers = ({ level, onComplete }: MissingNumbersProps) => {
  const [sequence, setSequence] = useState<(number | null)[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const generateSequence = () => {
    const step = Math.floor(level / 2) + 1;
    const start = Math.max(1, Math.floor(Math.random() * 10));
    const sequence = [start, start + step, start + 2 * step];
    const missingIndex = Math.floor(Math.random() * 3);
    setCorrectAnswer(sequence[missingIndex]);
    sequence[missingIndex] = null;
    setSequence(sequence);
    setUserAnswer("");
    setIsCorrect(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(userAnswer);
    
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter the missing number"
            className="text-center text-xl"
            required
            disabled={isCorrect !== null}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isCorrect !== null}
          >
            Check Answer
          </Button>
        </form>
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