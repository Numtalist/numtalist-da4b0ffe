import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
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
  const [currentSentence, setCurrentSentence] = useState<number>(0);
  const [showingSentence, setShowingSentence] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const levelSentences = sentences[level as keyof typeof sentences] || sentences[1];
  const currentExercise = levelSentences[currentSentence];
  const displayTime = Math.max(1000 - (level - 1) * 100, 300);

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

      <Card className={`w-full max-w-2xl p-8 flex items-center justify-center transition-colors duration-300 ${
        showingSentence ? 'bg-[#F1F1F1]' : 'bg-[#FF7E1D]'
      }`}>
        <span className={`text-2xl font-bold text-center ${showingSentence ? '' : 'opacity-0'}`}>
          {currentExercise.text}
        </span>
      </Card>

      {!showingSentence && (
        <div className="w-full max-w-2xl space-y-6">
          <h3 className="text-xl font-semibold text-center mb-4">
            {currentExercise.question}
          </h3>
          <div className="grid gap-4">
            {currentExercise.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                variant={
                  selectedAnswer === index
                    ? isCorrect
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className={`w-full py-6 text-lg ${
                  selectedAnswer === index && isCorrect && "bg-green-500"
                }`}
                disabled={selectedAnswer !== null && selectedAnswer !== index}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
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
            {currentSentence === levelSentences.length - 1 ? "Complete Level" : "Next Sentence"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SentenceFlashing;
