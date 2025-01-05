import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";
import { Card } from "./ui/card";

interface WordFormationProps {
  level: number;
  onComplete: () => void;
}

const getWordsByLevel = (level: number): string[] => {
  switch (level) {
    case 1:
      return ["CAT", "DOG", "HAT"];
    case 2:
      return ["BIRD", "FISH", "DUCK"];
    case 3:
      return ["MOUSE", "HORSE", "SHEEP"];
    case 4:
      return ["RABBIT", "MONKEY", "TURTLE"];
    case 5:
      return ["DOLPHIN", "PENGUIN", "GIRAFFE"];
    case 6:
      return ["ELEPHANT", "BUTTERFLY", "CROCODILE"];
    case 7:
      return ["KANGAROO", "OCTOPUS", "DINOSAUR"];
    case 8:
      return ["RHINOCEROS", "HIPPOPOTAMUS", "CHIMPANZEE"];
    default:
      return ["CAT", "DOG", "HAT"];
  }
};

const WordFormation = ({ level, onComplete }: WordFormationProps) => {
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Calculate display time based on level (faster at higher levels)
  const displayTime = Math.max(1000 - (level - 1) * 100, 300);

  const shuffleWord = (word: string): string[] => {
    return word.split('').sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const words = getWordsByLevel(level);
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setShuffledLetters(shuffleWord(word));
    setSelectedLetters([]);
    setShowingSequence(true);
    setCurrentLetterIndex(0);
    setIsCorrect(null);

    // Show each letter in sequence
    let index = 0;
    const interval = setInterval(() => {
      if (index < word.length) {
        setCurrentLetterIndex(index);
        index++;
      } else {
        clearInterval(interval);
        setShowingSequence(false);
        setCurrentLetterIndex(-1);
      }
    }, displayTime);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [level]);

  const handleLetterSelect = (letter: string, index: number) => {
    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);
    
    // Remove the selected letter from shuffled letters
    const newShuffledLetters = [...shuffledLetters];
    newShuffledLetters.splice(index, 1);
    setShuffledLetters(newShuffledLetters);

    // Check if word is complete
    if (newSelectedLetters.length === currentWord.length) {
      const attempt = newSelectedLetters.join('');
      const correct = attempt === currentWord;
      setIsCorrect(correct);

      if (correct) {
        toast({
          title: "Correct! 🎉",
          description: "Well done! Click 'Next Level' to continue.",
        });
      } else {
        toast({
          title: "Try again! 🤔",
          description: "That's not the correct word.",
        });
      }
    }
  };

  const handleTryAgain = () => {
    startNewRound();
  };

  const handleNextLevel = () => {
    if (isCorrect) {
      onComplete();
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <div className="text-center mb-4 relative">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-2">Word Formation</h2>
          <p className="text-gray-600">Watch the letters and arrange them to form the word.</p>
        </div>
        <Button onClick={startGame} size="lg">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-4 relative">
        <LevelDisplay level={level} />
        <h2 className="text-2xl font-bold mb-2">Word Formation</h2>
        <p className="text-gray-600">Form the word</p>
      </div>

      <div className="grid grid-cols-1 gap-8 w-full max-w-md mx-auto">
        {/* Display area for sequence/selected letters */}
        <div className="grid grid-cols-8 gap-2">
          {currentWord.split('').map((letter, index) => (
            <Card
              key={index}
              className={`w-12 h-12 flex items-center justify-center text-2xl font-bold
                ${showingSequence 
                  ? currentLetterIndex === index 
                    ? 'bg-[#FF7E1D] text-white' 
                    : 'bg-gray-100' 
                  : 'bg-gray-100'}`}
            >
              {showingSequence && currentLetterIndex === index ? letter : 
               !showingSequence && selectedLetters[index] ? selectedLetters[index] : ''}
            </Card>
          ))}
        </div>

        {/* Letter selection area */}
        {!showingSequence && !isCorrect && (
          <div className="grid grid-cols-4 gap-4">
            {shuffledLetters.map((letter, index) => (
              <Button
                key={index}
                onClick={() => handleLetterSelect(letter, index)}
                variant="outline"
                className="w-12 h-12 text-2xl"
              >
                {letter}
              </Button>
            ))}
          </div>
        )}
      </div>

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
            Next Level
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordFormation;