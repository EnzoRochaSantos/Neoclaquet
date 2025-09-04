import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import { Header } from "./components/Header";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import MinhaLista from "./pages/MinhaLista";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/minhalista" element={<MinhaLista />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
