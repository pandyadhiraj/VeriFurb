import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4">
          {/* Links */}
          <div className="space-x-6"></div>

          {/* Copyright */}
          <p className="text-m text-gray-400 mt-6">
            &copy; 2025 VeriFurb. All rights reserved.
          </p>
          <p className="text-m text-gray-400 mt-6">
            Developed with ❤️ by Deeraj, Dhiraj and Rahul
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
