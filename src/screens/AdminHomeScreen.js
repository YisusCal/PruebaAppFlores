import React from "react";
import { View, Text, Button } from "react-native";

const AdminHome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido Administrador</Text>
      <Button title="Cerrar sesión" onPress={() => navigation.replace("Login")} />
    </View>
  );
};

export default AdminHome;
