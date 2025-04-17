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
import { getAuth } from "firebase/auth";
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
            try {
              const auth = getAuth();
              const user = auth.currentUser;

              // 1. Guardar el pedido en Firebase
              const nuevoPedido = {
                idPedido: nuevoId,
                productos: carrito.map((item) => ({
                  id: item.id,
                  nombre: item.nombre,
                  cantidad: item.cantidad,
                  precio: item.precio,
                })),
                total: carrito.reduce(
                  (acc, item) => acc + item.precio * item.cantidad,
                  0
                ),
                fecha: new Date().toISOString(),
                clienteUid: user.uid,
              };

              await addDoc(collection(db, "pedidos"), nuevoPedido);

              // 2. Actualizar stock en Firebase
              for (const item of carrito) {
                const florRef = doc(db, "flores", item.id);
                const florSnap = await getDoc(florRef);

                if (florSnap.exists()) {
                  const florData = florSnap.data();
                  const cantidadActual = Number(florData.cantidad);
                  const cantidadARestar = Number(item.cantidad);

                  // Prevenir stock negativo
                  const nuevaCantidad = Math.max(
                    cantidadActual - cantidadARestar,
                    0
                  );

                  if (!isNaN(cantidadActual) && !isNaN(cantidadARestar)) {
                    await updateDoc(florRef, { cantidad: nuevaCantidad });
                  } else {
                    console.warn(
                      "Cantidad inválida al actualizar stock:",
                      item,
                      florData
                    );
                  }
                } else {
                  console.warn("Flor no encontrada:", item.id);
                }
              }

              // 3. Limpiar carrito y redirigir
              vaciarCarrito();
              navigation.navigate("ClienteFlores");

            } catch (error) {
              console.error(
                "Error al guardar pedido o actualizar stock:",
                error
              );
              Alert.alert(
                "Error",
                "Ocurrió un problema al procesar tu pedido."
              );
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
      Alert.alert("Error", "No se pudo finalizar el pedido.");
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
