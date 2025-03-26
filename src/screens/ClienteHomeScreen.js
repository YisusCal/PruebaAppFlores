import React from "react";
import { View, Text, Button } from "react-native";

const ClienteHome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido Cliente</Text>
      <Button title="Cerrar sesión" onPress={() => navigation.replace("Login")} />
    </View>
  );
};

export default ClienteHome;
