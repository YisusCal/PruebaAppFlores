import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (flor) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === flor.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === flor.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCarrito, { ...flor, cantidad: 1 }];
      }
    });
  };

  const quitarDelCarrito = (flor) => {
    setCarrito((prevCarrito) => {
      return prevCarrito
        .map((item) =>
          item.id === flor.id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0);
    });
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
