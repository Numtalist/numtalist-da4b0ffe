import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import LevelDisplay from "./LevelDisplay";

interface MemoryChallengeProps {
  level: number;
  onComplete: () => void;
}

const MemoryChallenge = ({ level, onComplete }: MemoryChallengeProps) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [showingNumbers, setShowingNumbers] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const generateNumbers = () => {
    const count = Math.min(3 + Math.floor(level / 2), 8); // Increase numbers with level
    const maxNumber = Math.min(10 + level * 5, 99); // Increase max number with level
    const newNumbers = [];
    for (let i = 0; i < count; i++) {
      newNumbers.push(Math.floor(Math.random() * maxNumber) + 1);
    }
    return newNumbers;
  };

  const startNewRound = () => {
    const newNumbers = generateNumbers();
    setNumbers(newNumbers);
    setShowingNumbers(true);
    setUserInput("");
    setIsCorrect(null);

    // Hide numbers after 2 seconds
    setTimeout(() => {
      setShowingNumbers(false);
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  const handleSubmit = () => {
    const userNumbers = userInput.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const correctNumbers = new Set(numbers);
    const userCorrect = userNumbers.filter(n => correctNumbers.has(n));
    
    // Calculate percentage of correct answers
    const percentageCorrect = (userCorrect.length / numbers.length) * 100;
    const isSuccess = percentageCorrect >= 70; // Need 70% correct to pass

    setIsCorrect(isSuccess);

    if (isSuccess) {
      toast({
        title: "Well done! 🎉",
        description: `You remembered ${userCorrect.length} out of ${numbers.length} numbers!`,
      });
    } else {
      toast({
        title: "Try again! 🤔",
        description: `The numbers were: ${numbers.join(", ")}`,
        variant: "destructive",
      });
    }
  };

  const handleNextLevel = () => {
    if (isCorrect) {
      onComplete();
    }
  };

  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [level]);

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Memory Challenge</h2>
          <p className="text-gray-600">Remember as many numbers as you can!</p>
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
        <h2 className="text-2xl font-bold mb-2">Memory Challenge</h2>
        <p className="text-gray-600">
          {showingNumbers ? "Remember these numbers!" : "What numbers did you see?"}
        </p>
      </div>

      <Card className="w-full max-w-md p-8">
        {showingNumbers ? (
          <div className="grid grid-cols-4 gap-4">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="bg-orange-100 p-4 rounded-lg text-center text-2xl font-bold"
              >
                {num}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter numbers separated by commas"
              className="w-full p-2 border rounded"
              disabled={isCorrect !== null}
            />
            {isCorrect === null && (
              <Button onClick={handleSubmit} className="w-full">
                Check Answer
              </Button>
            )}
          </div>
        )}
      </Card>

      {isCorrect === false && (
        <Button 
          onClick={startNewRound}
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

export default MemoryChallenge;