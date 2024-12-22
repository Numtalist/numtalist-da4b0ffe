import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Profile</h1>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Speed Reading Progress</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-2xl font-bold text-primary">1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exercises Completed</p>
                  <p className="text-2xl font-bold text-primary">0</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mental Arithmetic Progress</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-2xl font-bold text-secondary">1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exercises Completed</p>
                  <p className="text-2xl font-bold text-secondary">0</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <span className="text-gray-400">?</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;