import { useState } from "react";
import Navbar from "@/components/Navbar";
import ActivityCard from "@/components/ActivityCard";

const exercises = [
  {
    id: 1,
    title: "Number Recognition",
    description: "Learn to quickly recognize single-digit numbers",
    level: 1,
  },
  {
    id: 2,
    title: "Sequence Flashing",
    description: "Remember and recall sequences of numbers",
    level: 1,
  },
  {
    id: 3,
    title: "Math Problems",
    description: "Solve simple addition, subtraction, and multiplication problems",
    level: 2,
  },
  {
    id: 4,
    title: "Missing Numbers",
    description: "Find the missing number in a sequence",
    level: 2,
  },
  {
    id: 5,
    title: "Number Comparison",
    description: "Choose the larger or smaller number",
    level: 2,
  },
  {
    id: 6,
    title: "Memory Challenge",
    description: "Remember and recall sets of numbers",
    level: 3,
  },
  {
    id: 7,
    title: "Timed Calculations",
    description: "Solve math problems within a time limit",
    level: 3,
  },
  {
    id: 8,
    title: "Number Puzzles",
    description: "Complete number patterns and equations",
    level: 3,
  },
  {
    id: 9,
    title: "Multiplication Tables",
    description: "Practice multiplication facts with a fun game",
    level: 4,
  },
  {
    id: 10,
    title: "Gamified Counting",
    description: "Count objects and match with numbers",
    level: 1,
  },
  {
    id: 11,
    title: "Number Sorting",
    description: "Sort numbers in ascending or descending order",
    level: 4,
  },
  {
    id: 12,
    title: "Math Stories",
    description: "Solve real-world math problems",
    level: 3,
  },
  {
    id: 13,
    title: "Fractions and Decimals",
    description: "Learn equivalent forms of numbers",
    level: 5,
  },
  {
    id: 14,
    title: "Number Speed Drills",
    description: "Practice quick number recognition",
    level: 5,
  },
];

const MentalArithmetic = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleExerciseClick = (id: number) => {
    console.log(`Selected exercise: ${id}`);
    // Exercise selection logic will be implemented later
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mental Arithmetic Exercises
          </h1>
          <p className="text-gray-600">Select an exercise to begin</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {exercises.map((exercise) => (
            <ActivityCard
              key={exercise.id}
              title={exercise.title}
              description={exercise.description}
              onClick={() => handleExerciseClick(exercise.id)}
              className="bg-white hover:bg-gray-50"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MentalArithmetic;