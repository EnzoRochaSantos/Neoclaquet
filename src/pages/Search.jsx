import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${query}`
          );
          const data = await response.json();
          setSearchResults(data.results);
        } catch (error) {
          console.error("Erro ao buscar resultados:", error);
        }
      };
      fetchSearchResults();
    }
  }, [query, TMDB_API_KEY]);

  return (
    <div className="pt-32 bg-violet-900 min-h-screen text-white">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Resultados para: "{query}"</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {searchResults.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="text-white group"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-300 w-full h-auto object-cover"
                />
              </div>
              <h3 className="mt-2 font-bold truncate">{movie.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
