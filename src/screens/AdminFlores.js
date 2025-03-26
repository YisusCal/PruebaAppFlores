import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, Image } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(); // Obtener la instancia de autenticación

const AdminFlores = ({ navigation }) => {
  const [flores, setFlores] = useState([]);

  // Cargar flores desde Firestore
  useEffect(() => {
    const fetchFlores = async () => {
      const querySnapshot = await getDocs(collection(db, "flores"));
      const floresArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlores(floresArray);
    };
    fetchFlores();
  }, []);

  // Eliminar una flor
  const eliminarFlor = async (id) => {
    try {
      await deleteDoc(doc(db, "flores", id));
      Alert.alert("Eliminado", "Flor eliminada correctamente");
      setFlores(flores.filter((flor) => flor.id !== id));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        Alert.alert("Sesión cerrada");
        navigation.replace("Login"); // Redirigir al Login después de cerrar sesión
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Gestión de Flores</Text>
      <Button title="Agregar Nueva Flor" onPress={() => navigation.navigate("AgregarFlor")} />
      <FlatList
        data={flores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderWidth: 1 }}>
            <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
            <Text>🌸 {item.nombre}</Text>
            <Text>💰 Precio: ${item.precio}</Text>
            <Text>📦 Cantidad: {item.cantidad}</Text>
            <Text>🔹 {item.disponible ? "Disponible" : "Agotado"}</Text>
            <Button title="Editar" onPress={() => navigation.navigate("EditarFlor", { flor: item })} />
            <Button title="Eliminar" color="red" onPress={() => eliminarFlor(item.id)} />
          </View>
        )}
      />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido al Home</Text>
            <Button title="Cerrar Sesión" onPress={handleLogout} />
          </View>
    </View>
    
  );
};

export default AdminFlores;
