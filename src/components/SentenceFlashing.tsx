import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
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
  ],
  4: [
    { text: "The children built a sandcastle at the beach", question: "What did the children build?", options: ["A house", "A sandcastle", "A fort"], answer: 1 },
    { text: "The teacher wrote on the whiteboard with a marker", question: "What did the teacher use to write?", options: ["Chalk", "Pencil", "Marker"], answer: 2 }
  ],
  5: [
    { text: "The autumn leaves fell gently from the trees", question: "In which season did the leaves fall?", options: ["Summer", "Winter", "Autumn"], answer: 2 },
    { text: "The chef prepared a delicious meal in the kitchen", question: "Who prepared the meal?", options: ["Waiter", "Chef", "Server"], answer: 1 }
  ],
  6: [
    { text: "The astronaut floated weightlessly in space", question: "Where did the astronaut float?", options: ["Ocean", "Air", "Space"], answer: 2 },
    { text: "The musician played a beautiful melody on the piano", question: "What instrument was played?", options: ["Guitar", "Violin", "Piano"], answer: 2 }
  ],
  7: [
    { text: "The scientist conducted an important experiment in the laboratory", question: "Where was the experiment conducted?", options: ["Classroom", "Laboratory", "Office"], answer: 1 },
    { text: "The painter created a masterpiece using vibrant colors", question: "What did the painter use?", options: ["Pencils", "Crayons", "Vibrant colors"], answer: 2 }
  ],
  8: [
    { text: "The adventurous explorer discovered ancient ruins in the dense jungle", question: "What did the explorer discover?", options: ["Ancient ruins", "Hidden treasure", "New species"], answer: 0 },
    { text: "The skilled photographer captured stunning images of the sunset", question: "What did the photographer capture?", options: ["Sunrise", "Moonlight", "Sunset"], answer: 2 }
  ]
};

const SentenceFlashing = ({ level, onComplete }: SentenceFlashingProps) => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showingWords, setShowingWords] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const { toast } = useToast();

  const levelSentences = sentences[level as keyof typeof sentences] || sentences[1];
  const currentExercise = levelSentences[currentSentence];
  const words = currentExercise.text.split(" ");
  const isLastSentence = currentSentence === levelSentences.length - 1;

  const displayTime = Math.max(400 - (level - 1) * 50, 200);

  const startSequence = () => {
    setShowingWords(true);
    setCurrentWord(0);
    setShowQuestion(false);
    setSelectedAnswer(null);
    setShowNextButton(false);

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
      setShowNextButton(true);
    } else {
      toast({
        title: "Try again",
        description: "That wasn't the correct answer.",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (isLastSentence) {
      onComplete();
    } else {
      setCurrentSentence(prev => prev + 1);
      setShowQuestion(false);
      setSelectedAnswer(null);
      setShowNextButton(false);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    startSequence();
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
        {!showingWords && !showQuestion && !showNextButton && (
          <Button onClick={startSequence} size="lg">
            Show Sentence
          </Button>
        )}

        {showingWords && (
          <div className="text-4xl font-bold min-h-[60px] flex items-center justify-center">
            {words[currentWord]}
          </div>
        )}

        {showQuestion && !showNextButton && (
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
                  disabled={selectedAnswer !== null && selectedAnswer !== index}
                >
                  {option}
                </Button>
              ))}
            </div>
            {selectedAnswer !== null && selectedAnswer !== currentExercise.answer && (
              <Button 
                onClick={handleTryAgain}
                variant="outline"
                className="w-full mt-4"
                size="lg"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
          </div>
        )}

        {showNextButton && (
          <div className="text-center space-y-4">
            <Button 
              onClick={handleNext}
              size="lg"
              className="gap-2"
            >
              {isLastSentence ? "Complete Level" : "Next Sentence"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SentenceFlashing;