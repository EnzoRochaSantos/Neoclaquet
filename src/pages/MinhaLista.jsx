import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const MinhaLista = () => {
  const { favorites } = useFavorites();

  return (
    <div className="pt-32 bg-gray-900 min-h-screen text-white">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Minha Lista</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {favorites.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="text-white group"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg group-hover:scale-105 transition-transform duration-300 w-full h-auto object-cover"
                  />
                </div>
                <h3 className="mt-2 font-bold truncate">{movie.title}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            A sua lista de filmes está vazia. Adicione filmes para vê-los aqui!
          </p>
        )}
      </div>
    </div>
  );
};

export default MinhaLista;
