import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Button } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useCarrito } from "../context/CarritoContext";
import { getAuth, signOut } from "firebase/auth";
import { useRoute } from "@react-navigation/native";
import { useFavoritos } from "../context/FavoritosContext"; // Usamos el contexto de favoritos

const ClienteFlores = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const { carrito, agregarAlCarrito, quitarDelCarrito } = useCarrito();
  const { favoritos, toggleFavorito, esFavorito } = useFavoritos(); // Usamos el contexto de favoritos
  const auth = getAuth();
  const route = useRoute();
  const filtros = route.params?.filtros;
  const total = (carrito.reduce((acc, item) => acc + item.cantidad, 0) > 0 ? true : false);
  console.log(!total);

  useEffect(() => {
    const obtenerFlores = async () => {
      try {
        let floresQuery = collection(db, "flores");

        if (filtros?.nombres?.length > 0) {
          floresQuery = query(floresQuery, where("nombre", "in", filtros.nombres));
        }

        if (filtros?.colores?.length > 0) {
          floresQuery = query(floresQuery, where("color", "in", filtros.colores));
        }

        const querySnapshot = await getDocs(floresQuery);
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
  }, [filtros]);

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

      <Button title="Cerrar Sesión" onPress={handleLogout} />
      <Text style={{ fontSize: 16, marginVertical: 10 }}>
        Productos en carrito: {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
      </Text>
      <Button title="Ver Carrito" onPress={() => navigation.navigate("CarritoScreen")} disabled={!total} />
      <Button title="Filtrar" onPress={() => navigation.navigate("FiltrosScreen")} />
      <Button title="Ver Favoritos" onPress={() => navigation.navigate("FavoritosScreen")} /> {/* Ya no pasamos favoritos */}

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

              {/* ❤️ Botón de favoritos */}
              <TouchableOpacity onPress={() => toggleFavorito(item)}>
                <Text style={{ fontSize: 20 }}>
                  {esFavorito(item.id) ? "❤️ Quitar de Favoritos" : "🤍 Agregar a Favoritos"}
                </Text>
              </TouchableOpacity>

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
