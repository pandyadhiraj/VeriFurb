import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-sky-400">VeriFurb</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Register Product
            </Link>
            <Link
              to="/refurbish"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Refurbish Product
            </Link>
            <Link
              to="/details"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Product Details
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4">
          <div className="flex flex-col space-y-4 px-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Register Product
            </Link>
            <Link
              to="/refurbish"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Refurbish Product
            </Link>
            <Link
              to="/details"
              className="text-gray-300 hover:text-sky-400 transition-all duration-300"
            >
              Product Details
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
