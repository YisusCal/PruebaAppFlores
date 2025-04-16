import React, { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.find((f) => f.id === producto.id);
      if (existe) {
        return prev.filter((f) => f.id !== producto.id);
      } else {
        return [...prev, producto];
      }
    });
  };

  const esFavorito = (id) => favoritos.some((f) => f.id === id);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);
