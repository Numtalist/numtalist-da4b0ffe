import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";
import LetterCard from "./LetterCard";
import WordDisplayArea from "./WordDisplayArea";

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

  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [level, gameStarted]);

  const handleLetterSelect = (letter: string, index: number) => {
    const newSelectedLetters = [...selectedLetters, letter];
    setSelectedLetters(newSelectedLetters);
    
    const newShuffledLetters = [...shuffledLetters];
    newShuffledLetters.splice(index, 1);
    setShuffledLetters(newShuffledLetters);

    if (newSelectedLetters.length === currentWord.length) {
      const attempt = newSelectedLetters.join('');
      const correct = attempt === currentWord;
      setIsCorrect(correct);

      toast({
        title: correct ? "Correct! 🎉" : "Try again! 🤔",
        description: correct ? "Well done! Click 'Next Level' to continue." : "That's not the correct word.",
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-center mb-8">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-4">Word Formation</h2>
          <p className="text-gray-600 mb-8">Watch the letters and arrange them to form the word.</p>
        </div>
        <Button 
          onClick={() => setGameStarted(true)}
          size="lg"
          className="bg-[#FF7E1D] hover:bg-[#FF6B00] text-white"
        >
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="text-center mb-8">
        <LevelDisplay level={level} />
        <h2 className="text-2xl font-bold mb-4">Word Formation</h2>
        <p className="text-gray-600 mb-4">Form the word</p>
      </div>

      <WordDisplayArea
        text={currentWord}
        speed={displayTime}
        isPlaying={showingSequence}
      />

      {!showingSequence && !isCorrect && (
        <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
          {shuffledLetters.map((letter, index) => (
            <LetterCard
              key={index}
              letter={letter}
              onClick={() => handleLetterSelect(letter, index)}
            />
          ))}
        </div>
      )}

      {isCorrect === false && (
        <Button 
          onClick={startNewRound}
          variant="secondary"
          className="mt-4"
        >
          Try Again
        </Button>
      )}

      {isCorrect && (
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex items-center gap-2 text-green-500">
            <Check className="w-6 h-6" />
            <span className="font-medium">Correct!</span>
          </div>
          <Button 
            onClick={onComplete}
            className="bg-[#FF7E1D] hover:bg-[#FF6B00] text-white"
          >
            Next Level
          </Button>
        </div>
      )}
    </div>
  );
};

export default WordFormation;
