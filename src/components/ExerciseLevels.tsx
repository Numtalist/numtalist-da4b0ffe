import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NumberRecognition from "./NumberRecognition";
import SequenceFlashing from "./SequenceFlashing";
import MathProblems from "./MathProblems";
import MissingNumbers from "./MissingNumbers";
import LetterRecognition from "./LetterRecognition";
import WordFormation from "./WordFormation";
import Confetti from "react-confetti";
import { useToast } from "@/hooks/use-toast";

interface ExerciseLevelsProps {
  title: string;
  description: string;
  levels?: number;
  currentLevel?: number;
}

const getExerciseDetails = (title: string) => {
  switch (title) {
    case "Letter Recognition":
      return {
        description: "Practice quick letter recognition with timed exercises",
        levels: 8
      };
    case "Word Formation":
      return {
        description: "Arrange letters to form words",
        levels: 8
      };
    case "Sequence Flashing":
      return {
        description: "Remember and recall sequences of numbers",
        levels: 8
      };
    case "Math Problems":
      return {
        description: "Solve addition, subtraction, and multiplication problems",
        levels: 8
      };
    case "Missing Numbers":
      return {
        description: "Find the missing number in sequences",
        levels: 8
      };
    default:
      return {
        description: "",
        levels: 8
      };
  }
};

const ExerciseLevels = ({ 
  title, 
  description, 
  levels = 8, 
  currentLevel = 1 
}: ExerciseLevelsProps) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState(currentLevel);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const handleLevelComplete = () => {
    if (selectedLevel) {
      if (!completedLevels.includes(selectedLevel)) {
        const newCompletedLevels = [...completedLevels, selectedLevel];
        setCompletedLevels(newCompletedLevels);
        
        if (newCompletedLevels.length === levels) {
          setShowConfetti(true);
          toast({
            title: "Congratulations! 🎉",
            description: "You've completed all levels!",
          });
          
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }
      }
      
      if (selectedLevel === unlockedLevel && unlockedLevel < levels) {
        setUnlockedLevel(prev => prev + 1);
      }
    }
    setSelectedLevel(null);
  };

  if (selectedLevel) {
    let ExerciseComponent;
    switch (title) {
      case "Letter Recognition":
        ExerciseComponent = LetterRecognition;
        break;
      case "Word Formation":
        ExerciseComponent = WordFormation;
        break;
      case "Sequence Flashing":
        ExerciseComponent = SequenceFlashing;
        break;
      case "Math Problems":
        ExerciseComponent = MathProblems;
        break;
      case "Missing Numbers":
        ExerciseComponent = MissingNumbers;
        break;
      default:
        ExerciseComponent = NumberRecognition;
    }

    return (
      <div className="flex justify-center items-center min-h-screen">
        <ExerciseComponent 
          level={selectedLevel} 
          onComplete={handleLevelComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <Card className="p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <Progress value={(unlockedLevel / levels) * 100} className="mb-6" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(levels)].map((_, i) => {
              const isCompleted = completedLevels.includes(i + 1);
              const isUnlocked = i + 1 <= unlockedLevel;
              const isCurrentLevel = i + 1 === unlockedLevel;
              
              return (
                <Card
                  key={i}
                  className={`p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
                    isCompleted ? "bg-[#F1F1F1] text-gray-900" : 
                    isCurrentLevel ? "bg-[#FF7E1D] text-white" : 
                    isUnlocked ? "bg-[#FF7E1D] text-white" : 
                    "bg-gray-400 text-gray-100"
                  }`}
                  onClick={() => isUnlocked && setSelectedLevel(i + 1)}
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
                      i + 1
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  <p className={`text-sm ${isUnlocked ? "text-white" : "text-gray-100"}`}>
                    Level {i + 1}
                  </p>
                </Card>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ExerciseLevels;