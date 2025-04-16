import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Button } from "react-native";
import { useCarrito } from "../context/CarritoContext";

const CarritoScreen = ({ navigation }) => {
  const { carrito, agregarAlCarrito, quitarDelCarrito } = useCarrito();

  // Calcular subtotal y total
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const total = subtotal; // Puedes sumar impuestos o envío aquí si lo deseas

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Carrito</Text>

      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
            <Image source={{ uri: item.foto }} style={{ width: 80, height: 80, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nombre}</Text>
              <Text>Precio: ${item.precio}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity onPress={() => quitarDelCarrito(item)}>
                  <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>−</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{item.cantidad}</Text>
                <TouchableOpacity onPress={() => agregarAlCarrito(item)}>
                  <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          carrito.length > 0 && (
            <View style={{ marginTop: 30, borderTopWidth: 1, paddingTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>🧾 Detalle del pedido</Text>
              <Text style={{ fontSize: 16 }}>Subtotal: ${subtotal.toFixed(2)}</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total: ${total.toFixed(2)}</Text>
            </View>
          )
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default CarritoScreen;
