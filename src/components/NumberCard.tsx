import { Card } from "@/components/ui/card";

interface NumberCardProps {
  number: number;
  showNumber: boolean;
  showAnswer: boolean;
}

const NumberCard = ({ number, showNumber, showAnswer }: NumberCardProps) => {
  return (
    <Card className="w-full max-w-[12rem] aspect-square flex items-center justify-center bg-white shadow-md">
      <div className="w-[85%] aspect-square rounded-lg bg-[#F97316] bg-opacity-20 flex items-center justify-center">
        <span className={`text-4xl font-bold ${showNumber || showAnswer ? '' : 'opacity-0'}`}>
          {number}
        </span>
      </div>
    </Card>
  );
};

export default NumberCard;