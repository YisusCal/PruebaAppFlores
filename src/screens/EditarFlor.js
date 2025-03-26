import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const EditarFlor = ({ route, navigation }) => {
  const { flor } = route.params;

  const [nombre, setNombre] = useState(flor.nombre);
  const [precio, setPrecio] = useState(flor.precio.toString());
  const [descripcion, setDescripcion] = useState(flor.descripcion);
  const [cantidad, setCantidad] = useState(flor.cantidad.toString());
  const [foto, setFoto] = useState(flor.foto);
  const [disponible, setDisponible] = useState(flor.disponible);

  const actualizarFlor = async () => {
    if (!nombre || !precio || !descripcion || !cantidad || !foto) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const florRef = doc(db, "flores", flor.id);
      await updateDoc(florRef, {
        nombre,
        precio: Number(precio),
        descripcion,
        cantidad: Number(cantidad),
        foto,
        disponible,
      });

      Alert.alert("Éxito", "Flor actualizada correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Editar Flor</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} keyboardType="numeric" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="URL de la Foto" value={foto} onChangeText={setFoto} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Actualizar" onPress={actualizarFlor} />
    </View>
  );
};

export default EditarFlor;
