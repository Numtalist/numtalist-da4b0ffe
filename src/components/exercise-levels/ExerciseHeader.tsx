interface ExerciseHeaderProps {
  title: string;
  description: string;
}

const ExerciseHeader = ({ title, description }: ExerciseHeaderProps) => (
  <div className="text-center mb-12">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ExerciseHeader;