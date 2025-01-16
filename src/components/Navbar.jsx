import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDex } from "../context/dexContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { dexes } = useDex();

  return (
    <nav className="bg-white border-b shadow-sm" onMouseLeave={() => setIsDropdownOpen(false)}>
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center">
          <img
            src={logo} // Replace with your logo
            alt="XDCSCAN Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold text-lg">XDCSCAN</span>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex space-x-6 relative">
          <Link to="/h" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/ask-ai" className="text-gray-700 hover:text-black">
            Ask AI
          </Link>
          <Link to="/blockchain" className="text-gray-700 hover:text-black">
            Blockchain
          </Link>
          <Link to="/tokens" className="text-gray-700 hover:text-black">
            Tokens
          </Link>
          <Link to="/nfts" className="text-gray-700 hover:text-black">
            NFTs
          </Link>

          {/* Dropdown for DeFi */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            <button className="text-gray-700 hover:text-black focus:outline-none">
              DeFi
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-2 w-40" onClick={() => setIsDropdownOpen(false)}>
                {dexes.map((dex) => (
                  <Link
                    key={dex.id}
                    to={`/defi/${dex.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {dex.attributes.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/resources" className="text-gray-700 hover:text-black">
            Resources
          </Link>
          <Link to="/developers" className="text-gray-700 hover:text-black">
            Developers
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-black">Sign In</button>
          <select className="bg-gray-100 text-gray-700 border border-gray-300 rounded px-2 py-1" defaultValue="XSwap">
            {dexes.map((dex) => (
              <option key={dex.id} value={dex.attributes.name}>
                {dex.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
