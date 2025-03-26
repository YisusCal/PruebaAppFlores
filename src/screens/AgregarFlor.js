import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const AgregarFlor = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [foto, setFoto] = useState(""); // URL de la imagen
  const [disponible, setDisponible] = useState(true);

  const agregarFlor = async () => {
    if (!nombre || !precio || !descripcion || !cantidad || !foto) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await addDoc(collection(db, "flores"), {
        nombre,
        precio: Number(precio),
        descripcion,
        cantidad: Number(cantidad),
        disponible,
        foto,
      });

      Alert.alert("Éxito", "Flor agregada correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Agregar Nueva Flor</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} keyboardType="numeric" style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="URL de la Foto" value={foto} onChangeText={setFoto} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Guardar" onPress={agregarFlor} />
    </View>
  );
};

export default AgregarFlor;
