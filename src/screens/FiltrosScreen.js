import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

const FiltrosScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [coloresSeleccionados, setColoresSeleccionados] = useState([]);

  // Capturar valores al regresar desde las otras pantallas
  useFocusEffect(() => {
    if (route.params?.tiposSeleccionados) {
      setTiposSeleccionados(route.params.tiposSeleccionados);
      navigation.setParams({ tiposSeleccionados: undefined });
    }
    if (route.params?.coloresSeleccionados) {
      setColoresSeleccionados(route.params.coloresSeleccionados);
      navigation.setParams({ coloresSeleccionados: undefined });
    }
  });

  const aplicarFiltros = () => {
    // Ajusta los filtros para incluir nombre y color
    const nuevosFiltros = {
      nombres: tiposSeleccionados,  // Aquí se filtra por nombre (tiposSeleccionados)
      colores: coloresSeleccionados,  // Aquí se filtra por color (coloresSeleccionados)
    };

    navigation.navigate("AdminFlores", { filtros: nuevosFiltros });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Filtros</Text>

      <Button
        title={`Seleccionar Tipo de Flor (${tiposSeleccionados.length})`}
        onPress={() =>
          navigation.navigate("SeleccionarTipoScreen", {
            seleccionados: tiposSeleccionados,
          })
        }
      />

      <Button
        title={`Seleccionar Color (${coloresSeleccionados.length})`}
        onPress={() =>
          navigation.navigate("SeleccionarColorScreen", {
            seleccionados: coloresSeleccionados,
          })
        }
      />

      <Button title="Aplicar Filtros" onPress={aplicarFiltros} />
    </View>
  );
};

export default FiltrosScreen;
