import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle } from "lucide-react";

interface LevelCardProps {
  level: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrentLevel: boolean;
  onClick: () => void;
}

const LevelCard = ({
  level,
  isCompleted,
  isUnlocked,
  isCurrentLevel,
  onClick,
}: LevelCardProps) => (
  <Card
    className={`p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
      isCompleted ? "bg-[#F1F1F1] text-gray-900" : 
      isCurrentLevel ? "bg-[#FF7E1D] text-white" : 
      isUnlocked ? "bg-[#FF7E1D] text-white" : 
      "bg-gray-400 text-gray-100"
    }`}
    onClick={() => isUnlocked && onClick()}
  >
    {isCompleted && (
      <Badge 
        variant="secondary" 
        className="absolute top-2 right-2"
      >
        <CheckCircle className="w-4 h-4" />
      </Badge>
    )}
    <div className="text-2xl font-bold mb-2">
      {isUnlocked ? (
        level
      ) : (
        <Lock className="w-6 h-6" />
      )}
    </div>
    <p className={`text-sm ${isUnlocked ? "text-white" : "text-gray-100"}`}>
      Level {level}
    </p>
  </Card>
);

export default LevelCard;