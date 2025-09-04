import React, { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { FaPlus, FaCheck } from "react-icons/fa";

const Home = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [certification, setCertification] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const trendingResponse = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&language=pt-BR`
        );
        const trendingData = await trendingResponse.json();
        const random =
          trendingData.results[
            Math.floor(Math.random() * trendingData.results.length)
          ];
        setRandomMovie(random);

        if (random) {
          const releaseDatesResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${random.id}/release_dates?api_key=${TMDB_API_KEY}`
          );
          const releaseDatesData = await releaseDatesResponse.json();
          const brRelease = releaseDatesData.results.find(
            (result) => result.iso_3166_1 === "BR"
          );
          if (brRelease && brRelease.release_dates[0]) {
            setCertification(brRelease.release_dates[0].certification);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
      }
    };
    fetchMovieData();
  }, [TMDB_API_KEY]);

  if (!randomMovie) {
    return (
      <div className="bg-black h-screen text-white flex justify-center items-center font-fontPoppins">
        Carregando...
      </div>
    );
  }

  const isMovieInList = isFavorite(randomMovie.id);
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
  const releaseYear = randomMovie.release_date.substring(0, 4);

  const handleToggleFavorite = () => {
    if (isMovieInList) {
      removeFavorite(randomMovie.id);
    } else {
      addFavorite(randomMovie);
    }
  };

  return (
    <div>
      <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), transparent), url(${backgroundImageUrl})`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex items-center px-12">
          <div className="text-white max-w-2xl space-y-4">
            <div className="flex items-center space-x-4 text-gray-300 font-semibold ">
              {certification && (
                <span className="bg-violet-400 text-black px-2 py-0.5 rounded-md text-sm font-bold ">
                  {certification}+
                </span>
              )}
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-violet-600 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>{randomMovie.vote_average.toFixed(1)}</span>
              </div>
              <span>•</span>
              <span>{releaseYear}</span>
              <span className="opacity-80"></span>
            </div>
            <h1 className="text-6xl font-extrabold leading-tight font-fontPoppins">
              {randomMovie.title}
            </h1>
            <p className="text-lg line-clamp-3 font-fontRoboto">
              {randomMovie.overview}
            </p>
            <div className="flex flex-col items-start space-y-4 pt-4">
              <button className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors text-lg w-auto font-fontPoppins ">
                Assistir
              </button>
              <button
                onClick={handleToggleFavorite}
                className="group px-8 py-3 bg-gray-500 bg-opacity-70 text-white font-bold font-fontPoppins rounded hover:bg-gray-600 transition-all duration-300 flex items-center text-lg w-auto"
              >
                {isMovieInList ? (
                  <FaCheck className="mr-2" />
                ) : (
                  <FaPlus className="mr-2" />
                )}
                <span>{isMovieInList ? "Na Minha Lista" : "Minha Lista"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
