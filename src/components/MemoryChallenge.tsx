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
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [randomizedButtons, setRandomizedButtons] = useState<number[]>([]);
  const { toast } = useToast();

  const generateNumbers = () => {
    const count = Math.min(3 + Math.floor(level / 2), 8);
    const maxNumber = Math.min(10 + level * 5, 99);
    const newNumbers = [];
    for (let i = 0; i < count; i++) {
      newNumbers.push(Math.floor(Math.random() * maxNumber) + 1);
    }
    return newNumbers;
  };

  const shuffleArray = (array: number[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewRound = () => {
    const newNumbers = generateNumbers();
    setNumbers(newNumbers);
    setRandomizedButtons(shuffleArray([...newNumbers]));
    setShowingNumbers(true);
    setUserInput([]);
    setIsCorrect(null);

    setTimeout(() => {
      setShowingNumbers(false);
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  const handleNumberSelect = (number: number) => {
    if (userInput.length >= numbers.length) return;
    
    const newUserInput = [...userInput, number];
    setUserInput(newUserInput);

    if (newUserInput.length === numbers.length) {
      const correctNumbers = new Set(numbers);
      const userCorrect = newUserInput.filter(n => correctNumbers.has(n));
      const percentageCorrect = (userCorrect.length / numbers.length) * 100;
      const isSuccess = percentageCorrect >= 70;

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
          <div className="grid grid-cols-4 gap-4 place-items-center">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="bg-orange-100 p-4 rounded-lg text-center text-2xl font-bold w-16 h-16 flex items-center justify-center"
              >
                {num}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {randomizedButtons.map((num, index) => (
                <Button
                  key={index}
                  onClick={() => handleNumberSelect(num)}
                  variant={userInput.includes(num) ? "default" : "outline"}
                  className="h-16 text-2xl"
                  disabled={userInput.length === numbers.length || isCorrect !== null}
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className="text-center text-gray-600">
              Selected: {userInput.join(" → ")}
            </div>
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