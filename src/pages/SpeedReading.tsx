import { useState } from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const exercises = [
  {
    id: 1,
    title: "Letter Recognition",
    description: "Practice recognizing letters quickly",
    level: 1,
  },
  {
    id: 2,
    title: "Word Formation",
    description: "Arrange letters to form words",
    level: 1,
  },
  {
    id: 3,
    title: "Sight Words",
    description: "Learn to recognize common words instantly",
    level: 2,
  },
];

const SpeedReading = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Speed Reading Exercises
          </h1>
          <p className="text-gray-600">Select an exercise to begin</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
              <span className="text-xs text-primary">Level {exercise.level}</span>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SpeedReading;