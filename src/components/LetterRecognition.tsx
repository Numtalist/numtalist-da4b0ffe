import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import LevelDisplay from "./LevelDisplay";

interface LetterRecognitionProps {
  level: number;
  onComplete: () => void;
}

const LetterRecognition = ({ level, onComplete }: LetterRecognitionProps) => {
  const [letter, setLetter] = useState<string>('');
  const [showLetter, setShowLetter] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  // Calculate difficulty parameters based on level
  const displayTime = Math.max(1000 - (level - 1) * 100, 300);
  const numChoices = Math.min(3 + Math.floor(level / 2), 8);

  const generateLetter = () => {
    // Generate random letter (A-Z)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const generateChoices = (correctLetter: string) => {
    const choices = [correctLetter];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    while (choices.length < numChoices) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      if (!choices.includes(randomLetter)) {
        choices.push(randomLetter);
      }
    }
    return choices.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newLetter = generateLetter();
    setLetter(newLetter);
    setChoices(generateChoices(newLetter));
    setShowLetter(true);
    setSelectedLetter(null);
    setIsCorrect(null);
    setShowAnswer(false);

    // Hide letter after display time
    setTimeout(() => {
      setShowLetter(false);
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

  const handleLetterSelect = (choice: string) => {
    setSelectedLetter(choice);
    const correct = choice === letter;
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
        description: "That's not the letter we showed. Try again!",
      });
      setShowLetter(true);
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
          <h2 className="text-2xl font-bold mb-2">Letter Recognition</h2>
          <p className="text-gray-600">Remember the letter shown and select it from the choices below.</p>
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
        <h2 className="text-2xl font-bold mb-2">Letter Recognition</h2>
        <p className="text-gray-600">Remember the letter</p>
      </div>

      <Card className={`w-32 h-32 flex items-center justify-center transition-colors duration-300 ${
        showLetter || showAnswer ? 'bg-[#F1F1F1]' : 'bg-[#FF7E1D]'
      }`}>
        <span className={`text-5xl font-bold ${showLetter || showAnswer ? '' : 'opacity-0'}`}>
          {letter}
        </span>
      </Card>

      {!showLetter && !showAnswer && (
        <div className="grid grid-cols-3 gap-4 w-full max-w-[300px] place-items-center">
          {choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleLetterSelect(choice)}
              variant={
                selectedLetter === choice
                  ? isCorrect
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className={`w-16 h-16 text-2xl ${
                selectedLetter === choice && isCorrect && "bg-green-500"
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

export default LetterRecognition;