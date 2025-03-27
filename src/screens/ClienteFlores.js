import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useCarrito } from "../context/CarritoContext";
import { getAuth, signOut } from "firebase/auth";

const ClienteFlores = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const { carrito, agregarAlCarrito, quitarDelCarrito } = useCarrito();
  const auth = getAuth();

  useEffect(() => {
    const obtenerFlores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "flores"));
        const listaFlores = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(listaFlores);
      } catch (error) {
        console.error("Error al obtener flores:", error);
      }
    };

    obtenerFlores();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Catálogo de Flores</Text>

      {/* Botón de Cerrar Sesión */}
      <Button title="Cerrar Sesión" onPress={handleLogout} />

      {/* Botón de Ver Carrito */}
      <Button title="Ver Carrito" onPress={() => navigation.navigate("CarritoScreen")} />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const productoEnCarrito = carrito.find((prod) => prod.id === item.id);
          const cantidad = productoEnCarrito ? productoEnCarrito.cantidad : 0;

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("FlorDetalles", { flor: item })}
              style={{ marginBottom: 15, padding: 10, borderWidth: 1 }}
            >
              {item.foto && (
                <Image source={{ uri: item.foto }} style={{ width: 100, height: 100, marginBottom: 5 }} />
              )}
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nombre}</Text>
              <Text>Precio: ${item.precio}</Text>
              <Text>Cantidad: {item.cantidad}</Text>
              <Text>Disponibilidad: {item.disponible ? "Disponible" : "Agotado"}</Text>

              {cantidad === 0 ? (
                <Button title="Agregar al carrito" onPress={() => agregarAlCarrito(item)} />
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <Button title="-" onPress={() => quitarDelCarrito(item)} />
                  <Text style={{ marginHorizontal: 10, fontSize: 18 }}>{cantidad}</Text>
                  <Button title="+" onPress={() => agregarAlCarrito(item)} />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ClienteFlores;




/* import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useCarrito } from "../context/CarritoContext";
import { useNavigation } from "@react-navigation/native";

const ClienteFlores = () => {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerFlores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "flores"));
        const listaFlores = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(listaFlores);
      } catch (error) {
        console.error("Error al obtener flores:", error);
      }
    };

    obtenerFlores();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Catálogo de Flores
      </Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15, padding: 10, borderWidth: 1 }}>
            {item.foto && (
              <Image
                source={{ uri: item.foto }}
                style={{ width: 100, height: 100, marginBottom: 5 }}
              />
            )}
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nombre}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Text>Descripción: {item.descripcion}</Text>
            <Text>Cantidad disponible: {item.cantidad}</Text>
            <Text>Disponibilidad: {item.disponible ? "Disponible" : "Agotado"}</Text>
            <Button title="Agregar al carrito" onPress={() => agregarAlCarrito(item)} />
          </View>
        )}
      />

      <View>
        <Button title="Ver Carrito" onPress={() => navigation.navigate("CarritoScreen")} />
      </View>
    </View>
  );
};

export default ClienteFlores;
 */