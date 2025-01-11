import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import WordDisplayArea from "./WordDisplayArea";

interface SpeedReadingChallengesProps {
  level: number;
  onComplete: () => void;
}

const SpeedReadingChallenges = ({ level, onComplete }: SpeedReadingChallengesProps) => {
  const [speed, setSpeed] = useState(300 - (level * 25));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentText] = useState(
    "The quick brown fox jumps over the lazy dog. Reading quickly requires practice and dedication. Focus on the words and try to understand their meaning while maintaining speed."
  );
  const { toast } = useToast();

  const questions = [
    {
      question: "What animal was mentioned in the text?",
      options: ["Cat", "Fox", "Dog", "All of the above"],
      correctAnswer: "All of the above"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setShowQuestions(true);
      }, (currentText.split(" ").length * speed) + 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentText, speed]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === questions[0].correctAnswer) {
      toast({
        title: "Correct Answer!",
        description: "Great job on completing this speed reading challenge!",
      });
      onComplete();
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Try reading the text again and pay attention to the details.",
        variant: "destructive",
      });
      setShowQuestions(false);
      setSelectedAnswer(null);
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Speed Reading Challenge</h2>
          <p className="text-gray-600">Level {level} - {speed} ms per word</p>
        </div>

        <WordDisplayArea
          text={currentText}
          speed={speed}
          isPlaying={isPlaying}
        />

        {!showQuestions ? (
          <div className="flex justify-center">
            <Button
              onClick={() => setIsPlaying(true)}
              disabled={isPlaying}
              className="w-full max-w-xs"
            >
              {isPlaying ? "Reading in Progress..." : "Start Reading"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{questions[0].question}</h3>
            <div className="space-y-2">
              {questions[0].options.map((option) => (
                <Button
                  key={option}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="w-full text-left justify-start"
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="w-full mt-4"
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SpeedReadingChallenges;