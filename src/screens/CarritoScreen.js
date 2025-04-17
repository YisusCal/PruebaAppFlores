import React from "react";
import { Alert } from "react-native";
import { db } from "../config/firebaseConfig";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useCarrito } from "../context/CarritoContext";

const CarritoScreen = ({ navigation }) => {
  const { carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito } =
    useCarrito();

  const confirmarPedido = async () => {
    try {
      // 1. Obtener todos los pedidos existentes para contar cuántos hay
      const pedidosSnapshot = await getDocs(collection(db, "pedidos"));
      const totalPedidos = pedidosSnapshot.size;

      // 2. Generar un nuevo ID incremental: 0001, 0002, etc.
      const nuevoId = (totalPedidos + 1).toString().padStart(4, "0");

      // 3. Mostrar alerta con el ID
      Alert.alert("Pedido Finalizado", `Tu ID de pedido es: ${nuevoId}`, [
        {
          text: "OK",
          onPress: async () => {
            // Paso 2, 3, 4 (lo haremos en los siguientes pasos)
            // Ejemplo: await guardarPedidoEnFirebase(nuevoId);
            // await actualizarStock();
            vaciarCarrito();
            navigation.navigate("ClienteFlores");
          },
        },
      ]);

      // 🔜 En el paso 2 guardaremos en Firebase y actualizaremos stock
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      Alert.alert("Error", "No se pudo finalizar el pedido.");
    }

    // 4. Actualizar el stock de cada producto en Firebase
    for (const item of carrito) {
      const productoRef = doc(db, "flores", item.id);
      const productoSnap = await getDoc(productoRef);

      if (productoSnap.exists()) {
        const productoData = productoSnap.data();
        const stockActual = productoData.cantidad || 0;
        const nuevoStock = stockActual - item.cantidad;

        // Evitar negativos
        if (nuevoStock < 0) {
          console.warn(`Stock insuficiente para ${item.nombre}`);
        } else {
          await updateDoc(productoRef, {
            cantidad: nuevoStock,
          });
        }
      }
    }
  };

  // Calcular subtotal y total
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const total = subtotal; // Puedes sumar impuestos o envío aquí si lo deseas

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Carrito
      </Text>

      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Image
              source={{ uri: item.foto }}
              style={{ width: 80, height: 80, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.nombre}
              </Text>
              <Text>Precio: ${item.precio}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity onPress={() => quitarDelCarrito(item)}>
                  <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>−</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                  {item.cantidad}
                </Text>
                <TouchableOpacity onPress={() => agregarAlCarrito(item)}>
                  <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() =>
          carrito.length > 0 && (
            <View style={{ marginTop: 30, borderTopWidth: 1, paddingTop: 20 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
              >
                🧾 Detalle del pedido
              </Text>
              <Text style={{ fontSize: 16 }}>
                Subtotal: ${subtotal.toFixed(2)}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Total: ${total.toFixed(2)}
              </Text>
            </View>
          )
        }
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Confirmar Pedido" onPress={confirmarPedido} />
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export default CarritoScreen;
