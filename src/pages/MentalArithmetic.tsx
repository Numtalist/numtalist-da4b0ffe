import { useState } from "react";
import Navbar from "@/components/Navbar";
import ExerciseLevels from "@/components/ExerciseLevels";
import ActivityCard from "@/components/ActivityCard";

const MentalArithmetic = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleExerciseSelect = (exercise: string) => {
    setSelectedExercise(exercise);
    setCurrentLevel(1);
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
            title={selectedExercise}
            description={getExerciseDescription(selectedExercise)}
            currentLevel={currentLevel}
          />
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
          <p className="text-lg text-gray-600 mb-4">
            Choose an exercise to begin practicing
          </p>
          <div className="space-y-2 text-gray-400 font-bold">
            <p>"Every Exercise, a Unique Challenge – No Repeats, Just Growth!"</p>
            <p className="italic">
              "Even after completing the level map, replaying offers a fresh and exciting experience every time!"
            </p>
          </div>
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
          <ActivityCard
            title="Missing Numbers"
            description="Find the missing number in numerical patterns"
            onClick={() => handleExerciseSelect("Missing Numbers")}
            className="bg-gradient-to-br from-primary/10 to-primary/5"
          />
          <ActivityCard
            title="Memory Challenge"
            description="Remember and recall a set of numbers shown briefly"
            onClick={() => handleExerciseSelect("Memory Challenge")}
            className="bg-gradient-to-br from-secondary/10 to-secondary/5"
          />
          <ActivityCard
            title="Number Comparison"
            description="Compare numbers and choose the larger or smaller one"
            onClick={() => handleExerciseSelect("Number Comparison")}
            className="bg-gradient-to-br from-[#FF7E1D]/10 to-[#FF7E1D]/5"
          />
          <ActivityCard
            title="Timed Calculations"
            description="Solve math problems that appear briefly on screen"
            onClick={() => handleExerciseSelect("Timed Calculations")}
            className="bg-gradient-to-br from-primary/10 to-primary/5"
          />
        </div>
      </main>
    </div>
  );
};

const getExerciseDescription = (exercise: string): string => {
  switch (exercise) {
    case "Number Recognition":
      return "Practice quick number recognition with timed exercises";
    case "Sequence Flashing":
      return "Remember and recall sequences of numbers";
    case "Math Problems":
      return "Solve addition, subtraction, and multiplication problems";
    case "Missing Numbers":
      return "Find the missing number in numerical patterns";
    case "Memory Challenge":
      return "Remember and recall a set of numbers shown briefly";
    case "Number Comparison":
      return "Compare numbers and choose the larger or smaller one";
    case "Timed Calculations":
      return "Solve math problems that appear briefly on screen";
    default:
      return "";
  }
};

export default MentalArithmetic;