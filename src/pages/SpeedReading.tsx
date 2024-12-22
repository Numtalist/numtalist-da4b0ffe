import { useState } from "react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ActivityCard from "@/components/ActivityCard";
import ExerciseLevels from "@/components/ExerciseLevels";

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
  {
    id: 4,
    title: "Sentence Flashing",
    description: "Read and comprehend rapidly displayed sentences",
    level: 2,
  },
  {
    id: 5,
    title: "Memory Match Game",
    description: "Match previously shown words from memory",
    level: 3,
  },
  {
    id: 6,
    title: "Speed Reading Challenges",
    description: "Practice with increasing word display speeds",
    level: 3,
  },
  {
    id: 7,
    title: "Phonics and Pronunciation",
    description: "Learn word sounds and pronunciation",
    level: 4,
  },
  {
    id: 8,
    title: "Word Meaning and Context",
    description: "Build vocabulary through context",
    level: 4,
  },
  {
    id: 9,
    title: "Visual Puzzles",
    description: "Complete words with missing letters",
    level: 5,
  },
];

const SpeedReading = () => {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const handleExerciseClick = (id: number) => {
    setSelectedExercise(id);
  };

  if (selectedExercise) {
    const exercise = exercises.find((ex) => ex.id === selectedExercise);
    if (!exercise) return null;

    return (
      <div>
        <Navbar />
        <ExerciseLevels
          title={exercise.title}
          description={exercise.description}
          levels={8}
          currentLevel={1}
        />
      </div>
    );
  }

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

export default SpeedReading;