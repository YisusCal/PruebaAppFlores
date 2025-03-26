import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(); // Obtener la instancia de autenticación

const HomeScreen = ({ navigation }) => {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido al Home</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
