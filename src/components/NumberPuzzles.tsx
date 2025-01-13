import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface NumberPuzzlesProps {
  level: number;
  onComplete: () => void;
}

const generatePuzzle = (level: number) => {
  const maxNumber = Math.min(10 + level * 5, 50);
  const operators = level <= 3 ? ['+'] : 
                   level <= 6 ? ['+', '-'] : 
                   ['+', '-', '*'];
  
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1, num2, answer, missingPosition;
  
  do {
    num1 = Math.floor(Math.random() * maxNumber) + 1;
    num2 = Math.floor(Math.random() * maxNumber) + 1;
    
    // Ensure subtraction doesn't result in negative numbers
    if (operator === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }
    
    answer = operator === '+' ? num1 + num2 :
            operator === '-' ? num1 - num2 :
            num1 * num2;
            
    // Randomly choose which number to hide (1, 2, or result)
    missingPosition = Math.floor(Math.random() * 3);
  } while (answer > maxNumber); // Ensure answer is within reasonable range

  // Generate choices
  const correctAnswer = missingPosition === 0 ? num1 : 
                       missingPosition === 1 ? num2 : 
                       answer;
  
  const choices = [correctAnswer];
  while (choices.length < 4) {
    const variation = Math.floor(Math.random() * 5) - 2;
    const choice = correctAnswer + variation;
    if (!choices.includes(choice) && choice >= 0) {
      choices.push(choice);
    }
  }

  return { 
    num1, 
    num2, 
    operator, 
    answer, 
    missingPosition,
    choices: choices.sort(() => Math.random() - 0.5)
  };
};

const NumberPuzzles = ({ level, onComplete }: NumberPuzzlesProps) => {
  const [puzzle, setPuzzle] = useState(generatePuzzle(level));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const startGame = () => {
    setGameStarted(true);
    setPuzzle(generatePuzzle(level));
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleTryAgain = () => {
    setPuzzle(generatePuzzle(level));
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (choice: number) => {
    setSelectedAnswer(choice);
    let correctAnswer;
    
    if (puzzle.missingPosition === 0) {
      correctAnswer = puzzle.num1;
    } else if (puzzle.missingPosition === 1) {
      correctAnswer = puzzle.num2;
    } else {
      correctAnswer = puzzle.answer;
    }

    const isAnswerCorrect = choice === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
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

  const renderPuzzle = () => {
    const { num1, num2, operator, answer, missingPosition } = puzzle;
    const parts = [
      missingPosition === 0 ? "_" : num1,
      operator,
      missingPosition === 1 ? "_" : num2,
      "=",
      missingPosition === 2 ? "_" : answer
    ];
    return parts.join(" ");
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Number Puzzles</h2>
          <p className="text-gray-600">Fill in the missing number to complete the equation.</p>
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
        <h2 className="text-2xl font-bold mb-2">Number Puzzles</h2>
        <p className="text-gray-600">What's the missing number?</p>
      </div>

      <div className="text-4xl font-bold mb-8 font-mono">
        {renderPuzzle()}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-[300px]">
        {puzzle.choices.map((choice, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerSelect(choice)}
            variant={
              selectedAnswer === choice
                ? isCorrect
                  ? "default"
                  : "destructive"
                : "outline"
            }
            className={`h-16 text-2xl ${
              selectedAnswer === choice && isCorrect && "bg-green-500"
            }`}
            disabled={isCorrect !== null}
          >
            {choice}
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

export default NumberPuzzles;