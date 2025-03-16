import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white fixed top-0 left-0 w-full shadow-md z-50 h-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <h1 className="text-base font-semibold tracking-wide">RefurbSys</h1>

        {/* Navigation Links */}
        <div className="flex space-x-5 text-sm">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/register" className="hover:text-gray-300 transition">
            Register
          </Link>
          <Link to="/refurbish" className="hover:text-gray-300 transition">
            Refurbish
          </Link>
          <Link to="/details" className="hover:text-gray-300 transition">
            Product Details
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
