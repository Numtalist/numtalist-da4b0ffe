import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock } from "lucide-react";
import NumberRecognition from "./NumberRecognition";

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

  const handleLevelComplete = () => {
    // Here you would typically update the progress and unlock the next level
    console.log("Level completed!");
  };

  if (selectedLevel) {
    return (
      <NumberRecognition 
        level={selectedLevel} 
        onComplete={handleLevelComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        <Card className="p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <Progress value={(currentLevel / levels) * 100} className="mb-6" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(levels)].map((_, i) => (
              <Card
                key={i}
                className={`p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  i + 1 <= currentLevel ? "bg-primary/10" : "bg-gray-100"
                }`}
                onClick={() => i + 1 <= currentLevel && setSelectedLevel(i + 1)}
              >
                <div className="text-2xl font-bold mb-2">
                  {i + 1 <= currentLevel ? (
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