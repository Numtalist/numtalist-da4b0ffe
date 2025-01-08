import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import LevelDisplay from "./LevelDisplay";
import SentenceDisplay from "./sentence-flashing/SentenceDisplay";
import AnswerOptions from "./sentence-flashing/AnswerOptions";
import FeedbackSection from "./sentence-flashing/FeedbackSection";
import { sentences } from "@/data/sentences";
import type { SentenceFlashingProps } from "@/types/sentence-flashing";

const SentenceFlashing = ({ level, onComplete }: SentenceFlashingProps) => {
  const [currentSentence, setCurrentSentence] = useState<number>(0);
  const [showingSentence, setShowingSentence] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const levelSentences = sentences[level as keyof typeof sentences] || sentences[1];
  const currentExercise = levelSentences[currentSentence];
  
  // Fixed display time of 2 seconds (2000ms) for all levels
  const displayTime = 2000;

  const startSequence = () => {
    setShowingSentence(true);
    setSelectedAnswer(null);
    setIsCorrect(null);

    setTimeout(() => {
      setShowingSentence(false);
    }, displayTime);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentExercise.answer;
    setIsCorrect(correct);

    if (correct) {
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

  const handleNextLevel = () => {
    if (isCorrect) {
      if (currentSentence < levelSentences.length - 1) {
        setCurrentSentence(prev => prev + 1);
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
          <h2 className="text-2xl font-bold mb-2">Sentence Reading</h2>
          <p className="text-gray-600">Read and comprehend the sentence, then answer the question.</p>
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
        <h2 className="text-2xl font-bold mb-2">Sentence Reading</h2>
        <p className="text-gray-600">Remember the sentence</p>
      </div>

      <SentenceDisplay 
        text={currentExercise.text}
        showingSentence={showingSentence}
      />

      {!showingSentence && (
        <div className="w-full max-w-2xl space-y-6">
          <h3 className="text-xl font-semibold text-center mb-4">
            {currentExercise.question}
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
        isLastSentence={currentSentence === levelSentences.length - 1}
      />
    </div>
  );
};

export default SentenceFlashing;
