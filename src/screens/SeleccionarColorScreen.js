import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";

const coloresDisponibles = ["Rojo", "Blanco", "Amarillo", "Rosa", "Morado"];

const SeleccionarColorScreen = ({ navigation, route }) => {
  const { seleccionados = [] } = route.params || {};
  const [seleccion, setSeleccion] = useState(seleccionados);

  const toggleSeleccion = (color) => {
    if (seleccion.includes(color)) {
      setSeleccion(seleccion.filter((c) => c !== color));
    } else {
      setSeleccion([...seleccion, color]);
    }
  };

  const agregarColores = () => {
    navigation.navigate("FiltrosScreen", { coloresSeleccionados: seleccion });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Selecciona los colores:</Text>
      <FlatList
        data={coloresDisponibles}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSeleccion(item)} style={{ padding: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text>{seleccion.includes(item) ? "✅ " : "⬜ "} {item}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Agregar" onPress={agregarColores} />
    </View>
  );
};

export default SeleccionarColorScreen;
