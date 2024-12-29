import { Card } from "@/components/ui/card";

interface NumberCardProps {
  number: number;
  showNumber: boolean;
  showAnswer: boolean;
}

const NumberCard = ({ number, showNumber, showAnswer }: NumberCardProps) => {
  return (
    <Card className="w-48 h-48 flex items-center justify-center bg-white shadow-md">
      <div className="w-40 h-40 rounded-lg bg-yellow-50 flex items-center justify-center">
        <span className={`text-4xl font-bold ${showNumber || showAnswer ? '' : 'opacity-0'}`}>
          {number}
        </span>
      </div>
    </Card>
  );
};

export default NumberCard;