import { useState } from "react";
import Navbar from "@/components/Navbar";
import ExerciseLevels from "@/components/ExerciseLevels";
import ActivityCard from "@/components/ActivityCard";
import NumberRecognition from "@/components/NumberRecognition";
import SequenceFlashing from "@/components/SequenceFlashing";
import MathProblems from "@/components/MathProblems";

const MentalArithmetic = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleExerciseSelect = (exercise: string) => {
    setSelectedExercise(exercise);
    setCurrentLevel(1);
  };

  const handleLevelComplete = () => {
    setCurrentLevel((prev) => prev + 1);
  };

  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 px-4">
          <button
            onClick={() => setSelectedExercise(null)}
            className="mb-4 text-primary hover:text-primary/80"
          >
            ← Back to exercises
          </button>
          <ExerciseLevels
            exercise={selectedExercise}
            currentLevel={currentLevel}
            onLevelComplete={handleLevelComplete}
          >
            {selectedExercise === "Number Recognition" && (
              <NumberRecognition
                level={currentLevel}
                onComplete={handleLevelComplete}
              />
            )}
            {selectedExercise === "Sequence Flashing" && (
              <SequenceFlashing
                level={currentLevel}
                onComplete={handleLevelComplete}
              />
            )}
            {selectedExercise === "Math Problems" && (
              <MathProblems
                level={currentLevel}
                onComplete={handleLevelComplete}
              />
            )}
          </ExerciseLevels>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mental Arithmetic Exercises
          </h1>
          <p className="text-lg text-gray-600">
            Choose an exercise to begin practicing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <ActivityCard
            title="Number Recognition"
            description="Practice quick number recognition with timed exercises"
            onClick={() => handleExerciseSelect("Number Recognition")}
            className="bg-gradient-to-br from-primary/10 to-primary/5"
          />
          <ActivityCard
            title="Sequence Flashing"
            description="Remember and recall sequences of numbers"
            onClick={() => handleExerciseSelect("Sequence Flashing")}
            className="bg-gradient-to-br from-secondary/10 to-secondary/5"
          />
          <ActivityCard
            title="Math Problems"
            description="Solve addition, subtraction, and multiplication problems"
            onClick={() => handleExerciseSelect("Math Problems")}
            className="bg-gradient-to-br from-[#FF7E1D]/10 to-[#FF7E1D]/5"
          />
        </div>
      </main>
    </div>
  );
};

export default MentalArithmetic;