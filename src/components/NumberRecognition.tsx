import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NumberCard from "./NumberCard";
import LevelDisplay from "./LevelDisplay";

interface NumberRecognitionProps {
  level: number;
  onComplete: () => void;
}

const NumberRecognition = ({ level, onComplete }: NumberRecognitionProps) => {
  const [number, setNumber] = useState<number>(0);
  const [showNumber, setShowNumber] = useState(false);
  const [choices, setChoices] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  // Calculate difficulty parameters based on level
  const displayTime = Math.max(1000 - (level - 1) * 100, 300);
  const numChoices = Math.min(3 + Math.floor(level / 2), 8);

  const generateNumber = () => {
    // Increases digit count with level
    const digitCount = Math.min(1 + Math.floor((level - 1) / 2), 4);
    const max = Math.pow(10, digitCount);
    const min = Math.pow(10, digitCount - 1);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generateChoices = (correctNumber: number) => {
    const choices = [correctNumber];
    const digitCount = correctNumber.toString().length;
    
    // Generate similar numbers for harder levels
    while (choices.length < numChoices) {
      let choice;
      if (level > 4) {
        // For higher levels, generate more similar numbers
        const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const position = Math.pow(10, Math.floor(Math.random() * digitCount));
        choice = correctNumber + (variation * position);
      } else {
        // For lower levels, generate more distinct numbers
        choice = generateNumber();
      }
      
      if (!choices.includes(choice) && choice > 0) {
        choices.push(choice);
      }
    }
    return choices.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newNumber = generateNumber();
    setNumber(newNumber);
    setChoices(generateChoices(newNumber));
    setShowNumber(true);
    setSelectedNumber(null);
    setIsCorrect(null);
    setShowAnswer(false);

    // Hide number after display time
    setTimeout(() => {
      setShowNumber(false);
    }, displayTime);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  const handleTryAgain = () => {
    startNewRound();
  };

  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [level]);

  const handleNumberSelect = (choice: number) => {
    setSelectedNumber(choice);
    const correct = choice === number;
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next Level' to continue.",
      });
      setShowAnswer(true);
    } else {
      toast({
        title: "Think again! 🤔",
        description: "That's not the number we showed. Try again!",
      });
      setShowNumber(true); // Show the number again after wrong answer
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
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">Number Recognition</h2>
          <p className="text-gray-600">Level {level}</p>
          <p className="text-gray-600 mt-4">
            Remember the number shown and select it from the choices below.
          </p>
        </div>
        <Button onClick={startGame} size="lg">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Number Recognition</h2>
        <p className="text-gray-600">Level {level}</p>
      </div>

      <div className="relative">
        <LevelDisplay level={level} />
        <NumberCard
          level={level}
          number={number}
          showNumber={showNumber}
          showAnswer={showAnswer}
        />
      </div>

      {!showNumber && !showAnswer && (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleNumberSelect(choice)}
              variant={
                selectedNumber === choice
                  ? isCorrect
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className={`w-16 h-16 text-2xl ${
                selectedNumber === choice && isCorrect && "bg-green-500"
              }`}
              disabled={isCorrect !== null}
            >
              {choice}
            </Button>
          ))}
        </div>
      )}

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

export default NumberRecognition;
