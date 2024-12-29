import React from "react";

interface LevelDisplayProps {
  level: number;
}

const LevelDisplay = ({ level }: LevelDisplayProps) => {
  return (
    <div className="mb-8">
      <span className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600">
        level {level}
      </span>
    </div>
  );
};

export default LevelDisplay;