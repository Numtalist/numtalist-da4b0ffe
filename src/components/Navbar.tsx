import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center">
                {/* Orange circle logo */}
              </div>
              <span className="text-xl font-medium" style={{ fontFamily: 'Poppins' }}>numtalist</span>
            </Link>
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive("/")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/speed-reading"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive("/speed-reading")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Speed Reading
            </Link>
            <Link
              to="/mental-arithmetic"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive("/mental-arithmetic")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mental Arithmetic
            </Link>
            <Link
              to="/profile"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive("/profile")
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;