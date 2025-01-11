import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import WordDisplayArea from "./WordDisplayArea";

interface SpeedReadingChallengesProps {
  level: number;
  onComplete: () => void;
}

const levelData = {
  1: {
    text: "The cat sat on the mat. It was a sunny day. The bird flew by.",
    speed: 300,
    question: "What sat on the mat?",
    options: ["Dog", "Cat", "Bird", "Mouse"],
    correctAnswer: "Cat"
  },
  2: {
    text: "The quick brown fox jumps over the lazy dog. Reading quickly requires practice and dedication.",
    speed: 275,
    question: "What animal jumped over the dog?",
    options: ["Cat", "Fox", "Bird", "Rabbit"],
    correctAnswer: "Fox"
  },
  3: {
    text: "In a distant galaxy, scientists discovered a new planet with unique properties. The atmosphere contained rare elements never seen before.",
    speed: 250,
    question: "What did scientists discover?",
    options: ["A new star", "A new planet", "A new galaxy", "A new element"],
    correctAnswer: "A new planet"
  },
  4: {
    text: "The human brain processes visual information faster than conscious thought. This ability helps us make quick decisions in critical situations.",
    speed: 225,
    question: "What helps us make quick decisions?",
    options: ["Visual processing", "Slow thinking", "Memory", "Experience"],
    correctAnswer: "Visual processing"
  },
  5: {
    text: "Quantum computing leverages the principles of superposition and entanglement to perform complex calculations exponentially faster than classical computers.",
    speed: 200,
    question: "What principles does quantum computing use?",
    options: ["Binary and coding", "Superposition and entanglement", "Speed and power", "Size and efficiency"],
    correctAnswer: "Superposition and entanglement"
  }
};

const SpeedReadingChallenges = ({ level, onComplete }: SpeedReadingChallengesProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { toast } = useToast();

  const currentLevelData = levelData[level as keyof typeof levelData] || levelData[1];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setShowQuestions(true);
      }, (currentLevelData.text.split(" ").length * currentLevelData.speed) + 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentLevelData]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === currentLevelData.correctAnswer) {
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
          <p className="text-gray-600">Level {level} - {currentLevelData.speed} ms per word</p>
        </div>

        <WordDisplayArea
          text={currentLevelData.text}
          speed={currentLevelData.speed}
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
            <h3 className="text-lg font-semibold">{currentLevelData.question}</h3>
            <div className="space-y-2">
              {currentLevelData.options.map((option) => (
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