import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";

const tiposDeFlores = ["Rosas", "Lirios", "Girasoles", "Tulipanes", "Orquídeas"];

const SeleccionarTipoScreen = ({ navigation, route }) => {
  const { seleccionados = [] } = route.params || {};
  const [seleccion, setSeleccion] = useState(seleccionados);

  const toggleSeleccion = (tipo) => {
    if (seleccion.includes(tipo)) {
      setSeleccion(seleccion.filter((t) => t !== tipo));
    } else {
      setSeleccion([...seleccion, tipo]);
    }
  };

  const agregarTipos = () => {
    navigation.navigate("FiltrosScreen", { tiposSeleccionados: seleccion });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Selecciona los tipos de flores:</Text>
      <FlatList
        data={tiposDeFlores}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSeleccion(item)} style={{ padding: 10, borderWidth: 1, marginBottom: 5 }}>
            <Text>{seleccion.includes(item) ? "✅ " : "⬜ "} {item}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Agregar" onPress={agregarTipos} />
    </View>
  );
};

export default SeleccionarTipoScreen;
