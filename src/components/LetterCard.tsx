interface LetterCardProps {
  letter: string;
  onClick: () => void;
}

const LetterCard = ({ letter, onClick }: LetterCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 bg-white border-2 border-[#FF7E1D] rounded-lg flex items-center justify-center text-xl font-bold text-[#FF7E1D] hover:bg-[#FF7E1D] hover:text-white transition-colors duration-200"
    >
      {letter}
    </button>
  );
};

export default LetterCard;