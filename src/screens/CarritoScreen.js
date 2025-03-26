import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useCarrito } from "../context/CarritoContext";

const CarritoScreen = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Carrito de Compras
      </Text>
      {carrito.length === 0 ? (
        <Text>Tu carrito está vacío</Text>
      ) : (
        <FlatList
          data={carrito}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 15, padding: 10, borderWidth: 1 }}>
              <Text>{item.nombre}</Text>
              <Text>Precio: ${item.precio}</Text>
              <Button title="Eliminar" onPress={() => eliminarDelCarrito(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CarritoScreen;
