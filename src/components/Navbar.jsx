import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { useState, useEffect } from "react";
import { Menu, Music, X } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="overflow-x-hidden w-full">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-800 tracking-wide">
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-2">
                <Music className="w-6 h-6 text-primary-foreground animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Nirmal Musicals & Sons.
                </h1>
                <p className="text-xs text-muted-foreground">
                  Musical Instruments
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/catalogue"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Catalogue
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-green-600 font-medium transition"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-full shadow-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md hover:bg-gray-200 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <Menu size={30} className="text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-gradient-to-br from-white via-white to-pink-100 transform transition-transform duration-300 z-50 shadow-lg border-l border-gray-200 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={toggleMenu} className="absolute top-4 left-4">
          <X size={30} className="text-gray-800" />
        </button>
        <div className="flex flex-col justify-center items-center h-full space-y-8">
          <Link
            to="/"
            onClick={toggleMenu}
            className="text-lg text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/catalogue"
            onClick={toggleMenu}
            className="text-lg text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Catalogue
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="text-lg text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="text-lg text-gray-700 hover:text-green-600 font-medium transition"
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-md hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;