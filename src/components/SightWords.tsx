import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LevelDisplay from "./LevelDisplay";

interface SightWordsProps {
  level: number;
  onComplete: () => void;
}

const DISPLAY_TIME = 500; // 500ms display time for words

const getWordsForLevel = (level: number): string[] => {
  const wordsByLevel = {
    1: ["the", "and", "a", "to", "in", "is", "you", "that"],
    2: ["it", "he", "was", "for", "on", "are", "as", "with"],
    3: ["his", "they", "at", "be", "this", "have", "from", "or"],
    4: ["one", "had", "by", "word", "but", "not", "what", "all"],
    5: ["were", "we", "when", "your", "can", "said", "there", "use"],
    6: ["each", "which", "she", "do", "how", "their", "if", "will"],
    7: ["up", "other", "about", "out", "many", "then", "them", "these"],
    8: ["so", "some", "her", "would", "make", "like", "him", "into"]
  };
  return wordsByLevel[level as keyof typeof wordsByLevel] || wordsByLevel[1];
};

const generateOptions = (correctWord: string, allWords: string[]): string[] => {
  const options = [correctWord];
  const otherWords = allWords.filter(word => word !== correctWord);
  
  while (options.length < 4) {
    const randomIndex = Math.floor(Math.random() * otherWords.length);
    const word = otherWords[randomIndex];
    if (!options.includes(word)) {
      options.push(word);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
};

const SightWords = ({ level, onComplete }: SightWordsProps) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [showingWord, setShowingWord] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  const startNewRound = () => {
    const words = getWordsForLevel(level);
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setShowingWord(true);
    setSelectedOption("");
    setIsCorrect(null);
    
    // Show the word briefly
    setTimeout(() => {
      setShowingWord(false);
      setOptions(generateOptions(word, words));
    }, DISPLAY_TIME);
  };

  useEffect(() => {
    if (gameStarted) {
      startNewRound();
    }
  }, [level, gameStarted]);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    const correct = value === currentWord;
    setIsCorrect(correct);
    
    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! Click 'Next Level' to continue.",
      });
    } else {
      toast({
        title: "Try again! 🤔",
        description: "That wasn't the correct word.",
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="text-center mb-8">
          <LevelDisplay level={level} />
          <h2 className="text-2xl font-bold mb-4">Sight Words</h2>
          <p className="text-gray-600 mb-8">Watch carefully and identify the word that appears.</p>
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
        <h2 className="text-2xl font-bold mb-4">Sight Words</h2>
        <p className="text-gray-600 mb-4">What word did you see?</p>
      </div>

      <div className="w-full max-w-md mx-auto mb-8">
        {showingWord ? (
          <div className="h-32 flex items-center justify-center">
            <p className="text-4xl font-bold">{currentWord}</p>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center">
            <p className="text-gray-400">Word will appear here</p>
          </div>
        )}
      </div>

      {!showingWord && options.length > 0 && !isCorrect && (
        <div className="w-full max-w-md mx-auto">
          <RadioGroup
            value={selectedOption}
            onValueChange={handleOptionSelect}
            className="flex flex-col gap-4"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <label
                  htmlFor={`option-${index}`}
                  className="text-lg font-medium cursor-pointer flex-grow"
                >
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {isCorrect === false && (
        <Button 
          onClick={startNewRound}
          variant="secondary"
          className="mt-8"
        >
          Try Again
        </Button>
      )}

      {isCorrect && (
        <div className="flex flex-col items-center gap-4 mt-8">
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

export default SightWords;