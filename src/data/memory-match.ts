import { LevelData } from "@/types/memory-match";

export const exercises: LevelData = {
  1: [
    {
      word: "happiness",
      options: ["happiness", "joyfulness", "cheeriness", "gladness"],
      answer: 0
    },
    {
      word: "beautiful",
      options: ["gorgeous", "beautiful", "attractive", "pretty"],
      answer: 1
    },
    {
      word: "adventure",
      options: ["journey", "voyage", "adventure", "expedition"],
      answer: 2
    }
  ],
  2: [
    {
      word: "mysterious",
      options: ["enigmatic", "mysterious", "puzzling", "cryptic"],
      answer: 1
    },
    {
      word: "incredible",
      options: ["incredible", "amazing", "fantastic", "wonderful"],
      answer: 0
    },
    {
      word: "determination",
      options: ["persistence", "resolve", "determination", "willpower"],
      answer: 2
    }
  ],
  // ... Add more levels as needed
};