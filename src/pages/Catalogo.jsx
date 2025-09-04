import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavSearch from "../components/NavSearch";

const Catalogo = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      let endpoint = "";
      let params = `api_key=${TMDB_API_KEY}&language=pt-BR`;

      if (category === "trending") {
        endpoint = "trending/movie/week";
      } else {
        endpoint = "discover/movie";
        const sortBy =
          category === "top_rated" ? "vote_average.desc" : "popularity.desc";
        params += `&sort_by=${sortBy}&vote_count.gte=100`;
      }

      if (selectedGenre) {
        params += `&with_genres=${selectedGenre}`;
      }

      const url = `https://api.themoviedb.org/3/${endpoint}?${params}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, [category, selectedGenre, TMDB_API_KEY]);

  return (
    <div className="pt-24 bg-gray-900 min-h-screen">
      <NavSearch
        onCategoryChange={setCategory}
        onGenreChange={setSelectedGenre}
      />

      <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
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
                className="rounded-xl group-hover:scale-105 transition-transform duration-300 w-full h-auto object-cover"
              />
            </div>
            <h3 className="mt-2 font-bold font-fontPoppins text-center truncate">
              {movie.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
