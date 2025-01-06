import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface SentenceFlashingProps {
  level: number;
  onComplete: () => void;
}

const sentences = {
  1: [
    { text: "The cat sat on the mat", question: "Where did the cat sit?", options: ["On the mat", "On the chair", "On the table"], answer: 0 },
    { text: "The dog ran in the park", question: "What did the dog do?", options: ["Slept", "Ran", "Walked"], answer: 1 }
  ],
  2: [
    { text: "The red bird flew over the house", question: "What color was the bird?", options: ["Blue", "Red", "Green"], answer: 1 },
    { text: "The boy played with his new toy", question: "What did the boy play with?", options: ["A book", "A ball", "A new toy"], answer: 2 }
  ],
  3: [
    { text: "Sarah bought fresh bread from the bakery", question: "Where did Sarah buy bread?", options: ["Supermarket", "Bakery", "Store"], answer: 1 },
    { text: "The sun was shining brightly in the sky", question: "How was the sun shining?", options: ["Dimly", "Brightly", "Weakly"], answer: 1 }
  ]
};

const SentenceFlashing = ({ level, onComplete }: SentenceFlashingProps) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showingWords, setShowingWords] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const levelSentences = sentences[level as keyof typeof sentences] || sentences[1];
  const currentExercise = levelSentences[currentSentence];
  const words = currentExercise.text.split(" ");

  const displayTime = Math.max(400 - (level - 1) * 50, 200);

  const startSequence = () => {
    setShowingWords(true);
    setCurrentWord(0);
    setShowQuestion(false);
    setSelectedAnswer(null);

    let wordIndex = 0;
    const interval = setInterval(() => {
      if (wordIndex < words.length - 1) {
        wordIndex++;
        setCurrentWord(wordIndex);
      } else {
        clearInterval(interval);
        setShowingWords(false);
        setShowQuestion(true);
      }
    }, displayTime);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentExercise.answer;

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! You understood the sentence.",
      });

      if (currentSentence < levelSentences.length - 1) {
        setTimeout(() => {
          setCurrentSentence(prev => prev + 1);
          setShowQuestion(false);
          setSelectedAnswer(null);
        }, 1500);
      } else {
        onComplete();
      }
    } else {
      toast({
        title: "Try again",
        description: "That wasn't the correct answer.",
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Sentence Flashing</h2>
          <p className="text-gray-600">Read the sentence carefully and answer the question.</p>
        </div>
        <Button onClick={() => setGameStarted(true)} size="lg">
          Start Exercise
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-4">
      <div className="text-center mb-4">
        <LevelDisplay level={level} />
        <h2 className="text-2xl font-bold mb-2">Sentence Flashing</h2>
        <p className="text-gray-600">Level {level}</p>
      </div>

      <Card className="w-full max-w-2xl p-8 flex flex-col items-center gap-6">
        {!showingWords && !showQuestion && (
          <Button onClick={startSequence} size="lg">
            Show Sentence
          </Button>
        )}

        {showingWords && (
          <div className="text-4xl font-bold min-h-[60px] flex items-center justify-center">
            {words[currentWord]}
          </div>
        )}

        {showQuestion && (
          <div className="w-full space-y-6">
            <h3 className="text-xl font-semibold text-center mb-4">
              {currentExercise.question}
            </h3>
            <div className="grid gap-4">
              {currentExercise.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full py-6 text-lg"
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SentenceFlashing;