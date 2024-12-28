import React from "react";
import { Card } from "@/components/ui/card";
import LevelDisplay from "./LevelDisplay";

interface NumberCardProps {
  level: number;
  number: number;
  showNumber: boolean;
  showAnswer: boolean;
}

const NumberCard = ({ level, number, showNumber, showAnswer }: NumberCardProps) => {
  return (
    <Card className="w-48 h-48 flex flex-col items-center justify-center bg-white p-4 relative">
      <LevelDisplay level={level} />
      {(showNumber || showAnswer) ? (
        <span className="text-6xl font-bold">{number}</span>
      ) : (
        <div className="w-32 h-32 bg-[#FEF7CD] rounded-2xl border-4 border-white shadow-lg" />
      )}
    </Card>
  );
};

export default NumberCard;