import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Play } from "lucide-react";
import LevelDisplay from "./LevelDisplay";

interface PhonicsAndPronunciationProps {
  level: number;
  onComplete: () => void;
}

const phonicsData = {
  1: [
    { word: "cat", phonetics: ["c", "a", "t"], components: ["c-", "-at"] },
    { word: "dog", phonetics: ["d", "o", "g"], components: ["d-", "-og"] },
  ],
  2: [
    { word: "ship", phonetics: ["sh", "i", "p"], components: ["sh-", "-ip"] },
    { word: "fish", phonetics: ["f", "i", "sh"], components: ["-ish", "f-"] },
  ],
  3: [
    { word: "chair", phonetics: ["ch", "ai", "r"], components: ["ch-", "-air"] },
    { word: "train", phonetics: ["tr", "ai", "n"], components: ["tr-", "-ain"] },
  ],
  4: [
    { word: "bright", phonetics: ["br", "igh", "t"], components: ["br-", "-ight"] },
    { word: "flight", phonetics: ["fl", "igh", "t"], components: ["fl-", "-ight"] },
  ],
  5: [
    { word: "beach", phonetics: ["b", "ea", "ch"], components: ["b-", "-each"] },
    { word: "reach", phonetics: ["r", "ea", "ch"], components: ["r-", "-each"] },
  ],
  6: [
    { word: "cloud", phonetics: ["cl", "ou", "d"], components: ["cl-", "-oud"] },
    { word: "proud", phonetics: ["pr", "ou", "d"], components: ["pr-", "-oud"] },
  ],
  7: [
    { word: "stream", phonetics: ["str", "ea", "m"], components: ["str-", "-eam"] },
    { word: "dream", phonetics: ["dr", "ea", "m"], components: ["dr-", "-eam"] },
  ],
  8: [
    { word: "through", phonetics: ["thr", "ou", "gh"], components: ["thr-", "-ough"] },
    { word: "thought", phonetics: ["th", "ough", "t"], components: ["th-", "-ought"] },
  ],
};

const PhonicsAndPronunciation = ({ level, onComplete }: PhonicsAndPronunciationProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Get the words for the current level, defaulting to level 1 if the level doesn't exist
  const levelWords = phonicsData[level as keyof typeof phonicsData] || phonicsData[1];
  
  // Ensure we have a valid currentWordIndex
  useEffect(() => {
    if (currentWordIndex >= levelWords.length) {
      setCurrentWordIndex(0);
    }
  }, [level, currentWordIndex, levelWords.length]);

  const currentWord = levelWords[currentWordIndex];

  // If somehow we don't have a currentWord, show a loading state
  if (!currentWord) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8">
          <p className="text-center">Loading exercise...</p>
        </Card>
      </div>
    );
  }

  const playPronunciation = async () => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify({
          text: currentWord.word,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.message || 'Failed to get audio');
      }

      const audioBlob = await response.blob();
      const audio = new Audio(URL.createObjectURL(audioBlob));
      await audio.play();
    } catch (error) {
      console.error('Error playing pronunciation:', error);
      toast({
        title: "Error",
        description: "Failed to play pronunciation. Please check if the API key is valid.",
        variant: "destructive",
      });
    }
  };

  const handleComponentSelect = (component: string) => {
    setSelectedComponent(component);
    const correct = currentWord.components.includes(component);
    setIsCorrect(correct);

    if (correct) {
      toast({
        title: "Correct! 🎉",
        description: "Well done! That's the right phonetic component.",
      });

      if (currentWordIndex < levelWords.length - 1) {
        setTimeout(() => {
          setCurrentWordIndex(prev => prev + 1);
          setSelectedComponent(null);
          setIsCorrect(null);
        }, 1500);
      } else {
        setTimeout(onComplete, 1500);
      }
    } else {
      toast({
        title: "Try again! 🤔",
        description: "That's not the correct phonetic component.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-4 relative">
        <LevelDisplay level={level} />
        <h2 className="text-2xl font-bold mb-2">Phonics Practice</h2>
        <p className="text-gray-600">Listen and identify the phonetic components</p>
      </div>

      <Card className="p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-4xl font-bold mb-4">{currentWord.word}</h3>
          <Button
            onClick={playPronunciation}
            variant="outline"
            className="gap-2"
          >
            <Play className="w-4 h-4" />
            Play Sound
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {currentWord.components.map((component, index) => (
            <Button
              key={index}
              onClick={() => handleComponentSelect(component)}
              variant={selectedComponent === component ? (isCorrect ? "default" : "destructive") : "outline"}
              className="text-lg py-6"
            >
              {component}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PhonicsAndPronunciation;
