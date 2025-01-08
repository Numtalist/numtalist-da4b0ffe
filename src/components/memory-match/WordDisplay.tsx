import { Card } from "@/components/ui/card";

interface WordDisplayProps {
  word: string;
  showingWord: boolean;
}

const WordDisplay = ({ word, showingWord }: WordDisplayProps) => (
  <Card className={`w-full max-w-2xl p-8 flex items-center justify-center transition-colors duration-300 ${
    showingWord ? 'bg-[#F1F1F1]' : 'bg-[#FF7E1D]'
  }`}>
    <span className={`text-3xl font-bold text-center ${showingWord ? '' : 'opacity-0'}`}>
      {word}
    </span>
  </Card>
);

export default WordDisplay;