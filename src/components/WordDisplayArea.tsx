import { Card } from "@/components/ui/card";

interface WordDisplayAreaProps {
  word: string;
  showingSequence: boolean;
  currentLetterIndex: number;
  selectedLetters: string[];
}

const WordDisplayArea = ({ 
  word, 
  showingSequence, 
  currentLetterIndex, 
  selectedLetters 
}: WordDisplayAreaProps) => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {word.split('').map((letter, index) => (
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
  );
};

export default WordDisplayArea;