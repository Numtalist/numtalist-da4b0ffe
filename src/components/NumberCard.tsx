import { Card } from "@/components/ui/card";

interface NumberCardProps {
  number: number;
  showNumber: boolean;
  showAnswer: boolean;
}

const NumberCard = ({ number, showNumber, showAnswer }: NumberCardProps) => {
  return (
    <Card className={`w-full aspect-square flex items-center justify-center transition-colors duration-300 ${
      showNumber || showAnswer ? 'bg-[#F1F1F1]' : 'bg-[#FF7E1D]'
    }`}>
      <div className="w-[85%] aspect-square rounded-lg flex items-center justify-center">
        <span className={`text-3xl font-bold ${showNumber || showAnswer ? '' : 'opacity-0'}`}>
          {number}
        </span>
      </div>
    </Card>
  );
};

export default NumberCard;