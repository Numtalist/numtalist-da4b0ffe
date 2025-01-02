import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface MathProblemsProps {
  level: number;
  onComplete: () => void;
}

interface Problem {
  num1: number;
  num2: number;
  operator: '+' | '-' | '*';
  answer: number;
  choices: number[];
}

const MathProblems = ({ level, onComplete }: MathProblemsProps) => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const generateProblem = () => {
    // Increase difficulty based on level
    const maxNumber = Math.min(5 + level * 2, 20);
    const operators: ('+' | '-' | '*')[] = level <= 3 ? ['+'] : 
                                          level <= 6 ? ['+', '-'] : 
                                          ['+', '-', '*'];
    
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * maxNumber) + 1;
    let num2 = Math.floor(Math.random() * maxNumber) + 1;
    
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

  const startGame = () => {
    setGameStarted(true);
    setProblem(generateProblem());
  };

  const handleAnswerSelect = (choice: number) => {
    setSelectedAnswer(choice);
    const correct = choice === problem?.answer;
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next Level' to continue.",
        duration: 3000, // Toast will disappear after 3 seconds
      });
    } else {
      toast({
        title: "Think again! 🤔",
        description: "That's not the right answer. Try again!",
        duration: 3000, // Toast will disappear after 3 seconds
      });
    }
  };

  const handleNextLevel = () => {
    if (isCorrect) {
      onComplete();
    }
  };

  const handleTryAgain = () => {
    setProblem(generateProblem());
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Math Problems</h2>
          <p className="text-gray-600">Solve the math problem by selecting the correct answer.</p>
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
        <h2 className="text-2xl font-bold mb-2">Math Problems</h2>
        <p className="text-gray-600">What's the answer?</p>
      </div>

      {problem && (
        <>
          <div className="text-4xl font-bold mb-8">
            {problem.num1} {problem.operator} {problem.num2} = ?
          </div>

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
        </>
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

export default MathProblems;