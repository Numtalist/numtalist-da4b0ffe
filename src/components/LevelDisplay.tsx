import React from "react";

interface LevelDisplayProps {
  level: number;
}

const LevelDisplay = ({ level }: LevelDisplayProps) => {
  return (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
      <span className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-600">
        level {level}
      </span>
    </div>
  );
};

export default LevelDisplay;