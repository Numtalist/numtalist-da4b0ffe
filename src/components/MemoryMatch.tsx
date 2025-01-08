import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import LevelDisplay from "./LevelDisplay";
import WordDisplay from "./memory-match/WordDisplay";
import AnswerOptions from "./memory-match/AnswerOptions";
import FeedbackSection from "./sentence-flashing/FeedbackSection";
import { exercises } from "@/data/memory-match";
import type { MemoryMatchProps } from "@/types/memory-match";

const MemoryMatch = ({ level, onComplete }: MemoryMatchProps) => {
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [showingWord, setShowingWord] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const levelExercises = exercises[level as keyof typeof exercises] || exercises[1];
  const currentExercise = levelExercises[currentWord];
  
  // Fixed display time of 2 seconds (2000ms) for all levels
  const displayTime = 2000;

  const startSequence = () => {
    setShowingWord(true);
    setSelectedAnswer(null);
    setIsCorrect(null);

    setTimeout(() => {
      setShowingWord(false);
    }, displayTime);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentExercise.answer;
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next' to continue.",
      });
    } else {
      toast({
        title: "Try again! 🤔",
        description: "That wasn't the word you saw.",
        variant: "destructive",
      });
    }
  };

  const handleNextLevel = () => {
    if (isCorrect) {
      if (currentWord < levelExercises.length - 1) {
        setCurrentWord(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        startSequence();
      } else {
        onComplete();
      }
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    startSequence();
  };

  useEffect(() => {
    if (gameStarted) {
      startSequence();
    }
  }, [level]);

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Memory Match</h2>
          <p className="text-gray-600">Remember the word and select it from the options.</p>
        </div>
        <Button onClick={() => {
          setGameStarted(true);
          startSequence();
        }} size="lg">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-4 relative">
        <LevelDisplay level={level} />
        <h2 className="text-2xl font-bold mb-2">Memory Match</h2>
        <p className="text-gray-600">Remember the word</p>
      </div>

      <WordDisplay 
        word={currentExercise.word}
        showingWord={showingWord}
      />

      {!showingWord && (
        <div className="w-full max-w-2xl space-y-6">
          <h3 className="text-xl font-semibold text-center mb-4">
            Select the word you just saw:
          </h3>
          <AnswerOptions
            options={currentExercise.options}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            onSelect={handleAnswerSelect}
          />
        </div>
      )}

      <FeedbackSection
        isCorrect={isCorrect}
        onTryAgain={handleTryAgain}
        onNextLevel={handleNextLevel}
        isLastSentence={currentWord === levelExercises.length - 1}
      />
    </div>
  );
};

export default MemoryMatch;