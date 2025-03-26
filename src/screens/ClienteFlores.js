import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Asegúrate de que la configuración esté bien
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
            <Text>{item.nombre}</Text>
            <Text>Precio: ${item.precio}</Text>
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
