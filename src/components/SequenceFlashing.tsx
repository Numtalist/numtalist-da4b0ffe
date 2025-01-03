import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NumberCard from "./NumberCard";
import LevelDisplay from "./LevelDisplay";

interface SequenceFlashingProps {
  level: number;
  onComplete: () => void;
}

const SequenceFlashing = ({ level, onComplete }: SequenceFlashingProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [randomizedButtons, setRandomizedButtons] = useState<number[]>([]);
  const { toast } = useToast();

  // Calculate difficulty parameters based on level
  const sequenceLength = Math.min(3 + Math.floor((level - 1) / 2), 8);
  const displayTime = Math.max(1000 - (level - 1) * 100, 300);
  const digitCount = Math.min(1 + Math.floor((level - 1) / 3), 3);

  const generateNumber = () => {
    const max = Math.pow(10, digitCount);
    const min = Math.pow(10, digitCount - 1);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generateSequence = () => {
    const newSequence = [];
    for (let i = 0; i < sequenceLength; i++) {
      newSequence.push(generateNumber());
    }
    return newSequence;
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
    const newSequence = generateSequence();
    setSequence(newSequence);
    setRandomizedButtons(shuffleArray([...newSequence]));
    setUserSequence([]);
    setShowingSequence(true);
    setCurrentIndex(0);
    setIsCorrect(null);

    let index = 0;
    const interval = setInterval(() => {
      if (index < newSequence.length) {
        setCurrentIndex(index);
        index++;
      } else {
        clearInterval(interval);
        setShowingSequence(false);
        setCurrentIndex(-1);
      }
    }, displayTime);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [level]);

  const handleNumberSelect = (number: number) => {
    if (userSequence.length >= sequence.length) return;
    
    const newUserSequence = [...userSequence, number];
    setUserSequence(newUserSequence);

    // Check if this selection completes the sequence
    if (newUserSequence.length === sequence.length) {
      // Compare sequences directly to ensure exact order match
      const correct = newUserSequence.every(
        (num, index) => num === sequence[index]
      );
      setIsCorrect(correct);

      if (correct) {
        toast({
          title: "Correct! 🎉",
          description: "Well done! Click 'Next Level' to continue.",
        });
      } else {
        toast({
          title: "Try again! 🤔",
          description: "That wasn't the correct sequence.",
        });
      }
    }
  };

  const handleNextLevel = () => {
    if (isCorrect) {
      onComplete();
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Sequence Flashing</h2>
          <p className="text-gray-600">Remember the sequence of numbers and tap them in the correct order.</p>
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
        <h2 className="text-2xl font-bold mb-2">Sequence Flashing</h2>
        <p className="text-gray-600">Level {level}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
        {sequence.map((num, index) => (
          <div key={index} className="w-full">
            <NumberCard
              number={num}
              showNumber={showingSequence && currentIndex === index}
              showAnswer={false}
            />
          </div>
        ))}
      </div>

      {!showingSequence && currentIndex === -1 && !isCorrect && (
        <div className="mt-8 w-full max-w-md mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {randomizedButtons.map((num, index) => (
              <Button
                key={index}
                onClick={() => handleNumberSelect(num)}
                variant={
                  userSequence[userSequence.length - 1] === num
                    ? "default"
                    : "outline"
                }
                className="w-full h-16 text-2xl"
                disabled={userSequence.length === sequence.length}
              >
                {num}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Selected: {userSequence.join(" → ")}
            </p>
          </div>
        </div>
      )}

      {isCorrect === false && (
        <Button onClick={startNewRound} variant="secondary" className="mt-4">
          Try Again
        </Button>
      )}

      {isCorrect && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Check className="text-green-500" />
            <span>Correct!</span>
          </div>
          <Button onClick={handleNextLevel} className="mt-4">
            Next Level
          </Button>
        </div>
      )}
    </div>
  );
};

export default SequenceFlashing;