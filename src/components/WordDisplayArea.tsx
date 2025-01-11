import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface WordDisplayAreaProps {
  text: string;
  speed: number;
  isPlaying: boolean;
}

const WordDisplayArea = ({ text, speed, isPlaying }: WordDisplayAreaProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => {
          if (prev >= words.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);

      return () => {
        clearInterval(interval);
        setCurrentWordIndex(0);
      };
    } else {
      setCurrentWordIndex(0);
    }
  }, [isPlaying, speed, words.length]);

  return (
    <div className="flex justify-center mb-8">
      <Card className="w-full h-24 flex items-center justify-center text-2xl font-bold bg-gray-100">
        {isPlaying ? words[currentWordIndex] : "Ready to start..."}
      </Card>
    </div>
  );
};

export default WordDisplayArea;