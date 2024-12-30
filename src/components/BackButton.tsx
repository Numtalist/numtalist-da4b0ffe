import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton = ({ 
  to, 
  label = "Back", 
  className = "" 
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      className={`flex items-center gap-2 ${className}`}
      onClick={handleClick}
    >
      <ArrowLeft className="w-4 h-4" /> {label}
    </Button>
  );
};

export default BackButton;