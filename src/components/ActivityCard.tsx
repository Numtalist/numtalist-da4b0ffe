import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const ActivityCard = ({ title, description, onClick, className }: ActivityCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Card>
  );
};

export default ActivityCard;