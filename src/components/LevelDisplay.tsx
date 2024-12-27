import React from "react";

interface LevelDisplayProps {
  level: number;
}

const LevelDisplay = ({ level }: LevelDisplayProps) => {
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-200 px-4 py-1 rounded-md text-sm">
      level {level}
    </div>
  );
};

export default LevelDisplay;