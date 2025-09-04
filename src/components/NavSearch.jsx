import React, { useState, useEffect } from "react";

const NavSearch = ({ onCategoryChange, onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [activeCategory, setActiveCategory] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const importantGenres = [
    "Ação",
    "Aventura",
    "Animação",
    "Comédia",
    "Crime",
    "Drama",
    "Família",
    "Fantasia",
    "Ficção científica",
    "Terror",
    "Romance",
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Erro ao buscar géneros:", error);
      }
    };
    fetchGenres();
  }, [TMDB_API_KEY]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleGenreClick = (genreId) => {
    const newSelectedGenre = selectedGenre === genreId ? null : genreId;
    setSelectedGenre(newSelectedGenre);
    onGenreChange(newSelectedGenre);
  };

  const categories = [
    { key: "popular", name: "Populares" },
    { key: "trending", name: "Em Alta" },
    { key: "top_rated", name: "Mais Votados" },
  ];

  return (
    <div className="py-4 px-8 bg-gray-900 text-white">
      <nav className="mb-6">
        <ul className="flex justify-center items-center space-x-8 border-b border-gray-700">
          {categories.map((cat) => (
            <li key={cat.key}>
              <button
                onClick={() => handleCategoryClick(cat.key)}
                className={`py-3 font-semibold transition-colors duration-300 ${
                  activeCategory === cat.key
                    ? "text-white border-b-4 border-violet-600"
                    : "text-gray-400 border-b-4 border-transparent hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap justify-center gap-3">
        {genres
          .filter((genre) => importantGenres.includes(genre.name))
          .map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-colors duration-300 ${
                selectedGenre === genre.id
                  ? "bg-violet-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {genre.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default NavSearch;
