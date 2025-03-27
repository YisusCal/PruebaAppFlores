import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useCarrito } from "../context/CarritoContext";

const FlorDetalles = ({ route, navigation }) => {
  const { flor } = route.params;
  const { carrito, agregarAlCarrito, quitarDelCarrito } = useCarrito();

  // Buscar si la flor ya está en el carrito
  const productoEnCarrito = carrito.find((prod) => prod.id === flor.id);
  const cantidad = productoEnCarrito ? productoEnCarrito.cantidad : 0;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{flor.nombre}</Text>
      {flor.foto && <Image source={{ uri: flor.foto }} style={{ width: 200, height: 200 }} />}
      <Text style={{ fontSize: 18 }}>Precio: ${flor.precio}</Text>
      <Text style={{ fontSize: 16 }}>Descripción: {flor.descripcion}</Text>
      <Text style={{ fontSize: 16 }}>Cantidad disponible: {flor.cantidad}</Text>

      {/* Control de cantidad */}
      {cantidad === 0 ? (
        <Button title="Agregar al carrito" onPress={() => agregarAlCarrito(flor)} />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Button title="-" onPress={() => quitarDelCarrito(flor)} />
          <Text style={{ marginHorizontal: 10, fontSize: 18 }}>{cantidad}</Text>
          <Button title="+" onPress={() => agregarAlCarrito(flor)} />
        </View>
      )}

      {/* Botón para volver */}
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default FlorDetalles;
