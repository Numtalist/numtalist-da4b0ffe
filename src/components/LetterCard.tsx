import { Button } from "@/components/ui/button";

interface LetterCardProps {
  letter: string;
  onClick: () => void;
}

const LetterCard = ({ letter, onClick }: LetterCardProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-12 h-12 text-2xl flex items-center justify-center"
    >
      {letter}
    </Button>
  );
};

export default LetterCard;