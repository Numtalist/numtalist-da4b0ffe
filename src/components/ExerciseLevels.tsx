import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import { useToast } from "@/hooks/use-toast";
import ExerciseHeader from "./exercise-levels/ExerciseHeader";
import LevelCard from "./exercise-levels/LevelCard";
import ExerciseComponent from "./exercise-levels/ExerciseComponent";

interface ExerciseLevelsProps {
  title: string;
  description: string;
  levels?: number;
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
    return (
      <ExerciseComponent
        title={title}
        level={selectedLevel}
        onComplete={handleLevelComplete}
      />
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
        <ExerciseHeader title={title} description={description} />

        <Card className="p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <Progress value={(unlockedLevel / levels) * 100} className="mb-6" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(levels)].map((_, i) => {
              const level = i + 1;
              const isCompleted = completedLevels.includes(level);
              const isUnlocked = level <= unlockedLevel;
              const isCurrentLevel = level === unlockedLevel;
              
              return (
                <LevelCard
                  key={i}
                  level={level}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  isCurrentLevel={isCurrentLevel}
                  onClick={() => setSelectedLevel(level)}
                />
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ExerciseLevels;