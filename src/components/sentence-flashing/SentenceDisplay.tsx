import { Card } from "@/components/ui/card";

interface SentenceDisplayProps {
  text: string;
  showingSentence: boolean;
}

const SentenceDisplay = ({ text, showingSentence }: SentenceDisplayProps) => (
  <Card className={`w-full max-w-2xl p-8 flex items-center justify-center transition-colors duration-300 ${
    showingSentence ? 'bg-[#F1F1F1]' : 'bg-[#FF7E1D]'
  }`}>
    <span className={`text-2xl font-bold text-center ${showingSentence ? '' : 'opacity-0'}`}>
      {text}
    </span>
  </Card>
);

export default SentenceDisplay;