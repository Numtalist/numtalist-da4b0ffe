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
  const [currentText] = useState(
    "The quick brown fox jumps over the lazy dog. Reading quickly requires practice and dedication. Focus on the words and try to understand their meaning while maintaining speed."
  );
  const { toast } = useToast();

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
        toast({
          title: "Exercise Complete!",
          description: "Great job on completing this speed reading challenge!",
        });
        onComplete();
      }, (currentText.split(" ").length * speed) + 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentText, speed, onComplete, toast]);

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

        <div className="flex justify-center">
          <Button
            onClick={() => setIsPlaying(true)}
            disabled={isPlaying}
            className="w-full max-w-xs"
          >
            {isPlaying ? "Reading in Progress..." : "Start Reading"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SpeedReadingChallenges;