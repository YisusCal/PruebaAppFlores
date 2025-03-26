import React from "react";
import { View, Text, Image, Button } from "react-native";
import { useCarrito } from "../context/CarritoContext";

const FlorDetalles = ({ route, navigation }) => {
  const { flor } = route.params;
  const { agregarAlCarrito } = useCarrito();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        {flor.nombre}
      </Text>
      {flor.imagen && (
        <Image
          source={{ uri: flor.imagen }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}
      <Text style={{ fontSize: 18 }}>Precio: ${flor.precio}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Descripción: {flor.descripcion}
      </Text>
      <Text style={{ fontSize: 16 }}>Cantidad disponible: {flor.cantidad}</Text>
      <Text style={{ fontSize: 16 }}>
        Disponibilidad: {flor.disponible ? "Disponible" : "Agotado"}
      </Text>
      <Button title="Agregar al carrito" onPress={() => agregarAlCarrito(flor)} />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default FlorDetalles;
