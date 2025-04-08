import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

const FiltrosScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
  const [coloresSeleccionados, setColoresSeleccionados] = useState([]);
  const [userRole, setUserRole] = useState(null);

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

  useEffect(() => {
    // Recupera el rol del usuario desde AsyncStorage
    const obtenerRol = async () => {
      try {
        const rol = await AsyncStorage.getItem('userRole');
        console.log(rol)
        if (rol) {
          setUserRole(rol); // Almacena el rol en el estado
        }
      } catch (error) {
        console.error('Error al obtener el rol desde AsyncStorage:', error);
      }
    };

    obtenerRol();
  }, []);

  const aplicarFiltros = () => {
    const nuevosFiltros = {
      nombres: tiposSeleccionados,  // Aquí se filtra por nombre (tiposSeleccionados)
      colores: coloresSeleccionados,  // Aquí se filtra por color (coloresSeleccionados)
    };

    // Verifica el rol y redirige a la pantalla correspondiente
    if (userRole === "cliente") {
      navigation.navigate("ClienteFlores", { filtros: nuevosFiltros });
    } else if (userRole === "admin") {
      navigation.navigate("AdminFlores", { filtros: nuevosFiltros });
    }
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
