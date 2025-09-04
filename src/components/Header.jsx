import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { FaSearch } from "react-icons/fa";

export const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery("");
    }
  };

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = "py-2 transition-colors duration-300 ease-in-out";
    if (isActive) {
      return `${baseClasses} text-white font-bold border-b-4 border-red-600`;
    } else {
      return `${baseClasses} text-gray-300 border-b-4 border-transparent hover:text-white`;
    }
  };

  return (
    <header className="absolute top-0 w-full z-50 px-12 py-6 flex items-center justify-between border-b border-gray-800 bg-gradient-to-b from-black to-transparent font-fontPoppins">
      <div className="flex items-center space-x-12">
        <Logo />
        <nav>
          <ul className="flex items-center space-x-8 font-fontPoppins font-semibold">
            <li>
              <NavLink to="/" className={getNavLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalogo" className={getNavLinkClass}>
                Catálogo
              </NavLink>
            </li>

            <li>
              <NavLink to="/minhalista" className={getNavLinkClass}>
                Minha Lista
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-48 px-3 py-1.5 rounded-md text-white bg-black bg-opacity-40 border border-gray-600 transition-all duration-300 ease-in-out focus:w-64 focus:bg-opacity-60 focus:border-white focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-1.5 text-white font-semibold shadow-sm rounded-md  bg-violet-600 hover:bg-violet-900 transition-colors"
        >
          <FaSearch size={14} />
          <span>Buscar</span>
        </button>
      </form>
    </header>
  );
};
