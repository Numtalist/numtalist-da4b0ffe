import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface TimedCalculationsProps {
  level: number;
  onComplete: () => void;
}

const TimedCalculations = ({ level, onComplete }: TimedCalculationsProps) => {
  const [problem, setProblem] = useState<{
    num1: number;
    num2: number;
    operator: string;
    answer: number;
    choices: number[];
  } | null>(null);
  const [showingProblem, setShowingProblem] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  // Calculate difficulty parameters based on level
  const displayTime = Math.max(1000 - (level - 1) * 100, 300); // Decrease display time as level increases
  const maxNumber = Math.min(5 + level * 2, 20); // Increase number range with level

  const generateProblem = () => {
    const operators = level <= 3 ? ['+'] : 
                     level <= 6 ? ['+', '-'] : 
                     ['+', '-', '*'];
    
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2;

    if (operator === '*') {
      // For multiplication, limit numbers to 1-9
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
    } else {
      num1 = Math.floor(Math.random() * maxNumber) + 1;
      num2 = Math.floor(Math.random() * maxNumber) + 1;
    }
    
    // Ensure subtraction doesn't result in negative numbers
    if (operator === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }
    
    // Calculate correct answer
    const answer = operator === '+' ? num1 + num2 :
                  operator === '-' ? num1 - num2 :
                  num1 * num2;
    
    // Generate choices
    const choices = [answer];
    while (choices.length < 4) {
      const variation = Math.floor(Math.random() * 5) - 2;
      const choice = answer + variation;
      if (!choices.includes(choice) && choice >= 0) {
        choices.push(choice);
      }
    }
    
    return {
      num1,
      num2,
      operator,
      answer,
      choices: choices.sort(() => Math.random() - 0.5)
    };
  };

  const startNewRound = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);
    setShowingProblem(true);
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Hide problem after display time
    setTimeout(() => {
      setShowingProblem(false);
    }, displayTime);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  const handleAnswerSelect = (choice: number) => {
    if (!problem) return;
    
    setSelectedAnswer(choice);
    const correct = choice === problem.answer;
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next Level' to continue.",
      });
    } else {
      toast({
        title: "Try again! 🤔",
        description: `The correct answer was: ${problem.answer}`,
        variant: "destructive",
      });
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
          <h2 className="text-2xl font-bold mb-2">Timed Calculations</h2>
          <p className="text-gray-600">Solve the math problem quickly!</p>
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
        <h2 className="text-2xl font-bold mb-2">Timed Calculations</h2>
        <p className="text-gray-600">
          {showingProblem ? "Remember this problem!" : "What was the answer?"}
        </p>
      </div>

      {problem && (
        <>
          <div className="text-4xl font-bold mb-8">
            {showingProblem ? (
              `${problem.num1} ${problem.operator} ${problem.num2} = ?`
            ) : (
              "? ? ?"
            )}
          </div>

          {!showingProblem && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-[300px]">
              {problem.choices.map((choice, index) => (
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
          )}
        </>
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

export default TimedCalculations;