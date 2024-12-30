import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NumberRecognition from "./NumberRecognition";
import SequenceFlashing from "./SequenceFlashing";
import Confetti from "react-confetti";
import { useToast } from "@/hooks/use-toast";
import BackButton from "./BackButton";

interface ExerciseLevelsProps {
  title: string;
  description: string;
  levels: number;
  currentLevel?: number;
}

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
    const ExerciseComponent = title === "Sequence Flashing" 
      ? SequenceFlashing 
      : NumberRecognition;

    return (
      <div>
        <BackButton 
          className="absolute top-24 left-4" 
          label="Back to Levels"
          onClick={() => setSelectedLevel(null)}
        />
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
        <BackButton 
          to="/mental-arithmetic"
          label="Back to Exercises"
          className="mb-8"
        />

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <Card className="p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <Progress value={(unlockedLevel / levels) * 100} className="mb-6" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(levels)].map((_, i) => (
              <Card
                key={i}
                className={`p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
                  i + 1 <= unlockedLevel ? "bg-primary/10" : "bg-gray-100"
                }`}
                onClick={() => i + 1 <= unlockedLevel && setSelectedLevel(i + 1)}
              >
                {completedLevels.includes(i + 1) && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Badge>
                )}
                <div className="text-2xl font-bold mb-2">
                  {i + 1 <= unlockedLevel ? (
                    i + 1
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600">Level {i + 1}</p>
              </Card>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ExerciseLevels;
