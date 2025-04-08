import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Button, Alert, Image } from "react-native";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const auth = getAuth();

const AdminFlores = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [flores, setFlores] = useState([]);
  const [filtros, setFiltros] = useState(null);

  const cargarFlores = useCallback(() => {
    let floresQuery = collection(db, "flores");
    let filtrosAplicados = [];
  
    if (filtros) {
      console.log("📌 Aplicando filtros:", filtros);
  
      // Filtrar por nombre
      if (filtros.nombres && filtros.nombres.length > 0) {
        console.log("✔️ Nombres:", filtros.nombres);
        filtrosAplicados.push(where("nombre", "in", filtros.nombres));
      }
  
      // Filtrar por color
      if (filtros.colores && filtros.colores.length > 0) {
        console.log("✔️ Colores:", filtros.colores);
        filtrosAplicados.push(where("color", "in", filtros.colores));
      }
  
      // Si hay filtros aplicados, modificamos la consulta
      if (filtrosAplicados.length > 0) {
        floresQuery = query(floresQuery, ...filtrosAplicados);
      }
    }
  
    // Suscripción a los resultados de la consulta
    const unsubscribe = onSnapshot(floresQuery, (snapshot) => {
      const listaFlores = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("🌸 Flores recibidas:", listaFlores);
      setFlores(listaFlores);
    });
  
    return () => unsubscribe();
  }, [filtros]);
  

  // Cargar flores cuando se enfoque
  useFocusEffect(cargarFlores);

  // Escuchar si se aplicaron filtros al volver desde FiltrosScreen
  useFocusEffect(
    useCallback(() => {
      if (route.params?.filtros) {
        setFiltros(route.params.filtros);
        // Elimina los filtros de los params después de aplicarlos
        navigation.setParams({ filtros: undefined });
      }
    }, [route.params?.filtros])
  );

  const eliminarFlor = async (id) => {
    try {
      await deleteDoc(doc(db, "flores", id));
      Alert.alert("Eliminado", "Flor eliminada correctamente");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Gestión de Flores</Text>
      <Button
        title="Agregar Nueva Flor"
        onPress={() => navigation.navigate("AgregarFlor")}
      />
      <Button
        title="Filtrar"
        onPress={() => navigation.navigate("FiltrosScreen")}
      />

      <FlatList
        data={flores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderWidth: 1 }}>
            <Image
              source={{ uri: item.foto }}
              style={{ width: 100, height: 100 }}
            />
            <Text>🌸 {item.nombre}</Text>
            <Text>💰 Precio: ${item.precio}</Text>
            <Text>📦 Cantidad: {item.cantidad}</Text>
            <Text>🔹 {item.disponible ? "Disponible" : "Agotado"}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate("EditarFlor", { flor: item })}
            />
            <Button
              title="Eliminar"
              color="red"
              onPress={() => eliminarFlor(item.id)}
            />
          </View>
        )}
      />

      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido al Home</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

export default AdminFlores;
