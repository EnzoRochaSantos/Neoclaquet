import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { FaPlus, FaCheck } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isMovieInList = isFavorite(Number(id));

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const creditsData = await creditsResponse.json();
        const directorData = creditsData.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorData);
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
      }
    };

    window.scrollTo(0, 0);
    fetchMovieData();
  }, [id, TMDB_API_KEY]);

  const handleToggleFavorite = () => {
    if (isMovieInList) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (!movie) {
    return (
      <div className="bg-gray-900 h-screen text-white flex justify-center items-center">
        Carregando...
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="pt-32 pb-16 bg-gray-900 min-h-screen text-white flex justify-center items-center">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-10">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 max-w-sm rounded-lg shadow-2xl shadow-black/50"
        />

        <div className="md:w-2/3">
          <h1 className="text-4xl lg:text-5xl font-bold font-fontRoboto mb-4">
            {movie.title}
          </h1>
          <p className="text-lg text-gray-300 mb-6">{movie.overview}</p>

          <div className="flex items-center space-x-4 mb-4 text-lg">
            <span className="font-semibold text-yellow-400">
              Nota: {movie.vote_average.toFixed(1)}
            </span>
            <span>•</span>
            <span className="font-semibold">
              Lançamento:{" "}
              {new Date(movie.release_date).toLocaleDateString("pt-BR")}
            </span>
          </div>

          {director && (
            <p className="font-semibold text-gray-300 mb-8">
              Direção: {director.name}
            </p>
          )}

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-violet-600 text-white font-bold rounded hover:bg-violet-800 transition-colors"
            >
              Voltar
            </button>
            <button
              onClick={handleToggleFavorite}
              className="group px-6 py-2 bg-rose-500 bg-opacity-70 text-white font-bold rounded hover:bg-rose-900 transition-all duration-300 flex items-center gap-2"
            >
              {isMovieInList ? <FaCheck /> : <FaPlus />}
              <span>{isMovieInList ? "Na Minha Lista" : "Minha Lista"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
