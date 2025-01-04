import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  };

  useEffect(() => {
    generateSequence();
  }, [level]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(userAnswer);
    
    if (answer === correctAnswer) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Let's try another one.",
      });
      setTimeout(() => {
        if (level < 8) {
          generateSequence();
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      toast({
        title: "Not quite right",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <LevelDisplay level={level} />
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Find the Missing Number</h2>
        
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
          />
          
          <Button 
            type="submit" 
            className="w-full"
          >
            Check Answer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MissingNumbers;