import { useNavigate } from "react-router-dom";
import ActivityCard from "@/components/ActivityCard";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Numtalist
          </h1>
          <p className="text-lg text-gray-600">
            Enhance your reading speed and mental math skills through fun exercises
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ActivityCard
            title="Speed Reading"
            description="Improve your reading speed and comprehension through interactive exercises"
            onClick={() => navigate("/speed-reading")}
            className="bg-gradient-to-br from-primary/10 to-primary/5"
          />
          <ActivityCard
            title="Mental Arithmetic"
            description="Strengthen your mental math abilities with engaging challenges"
            onClick={() => navigate("/mental-arithmetic")}
            className="bg-gradient-to-br from-secondary/10 to-secondary/5"
          />
        </div>
      </main>
    </div>
  );
};

export default Index;