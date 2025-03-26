// src/screens/RegisterScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../config/firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { db } from "../config/FirebaseFirestore"; // Lo configuraremos a continuación

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Aquí definimos el rol, por ejemplo: "client" o "admin". 
  // En una app real, el rol admin se asignaría manualmente o mediante un proceso especial.
  const [role, setRole] = useState("cliente");

  const handleRegister = async () => {
    try {
      // Crear el usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Guardar información en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role,  // Puede ser "admin" o "cliente"
      });

      Alert.alert("Registro exitoso", "Usuario creado correctamente");
      //navigation.replace("Home"); // Redirige al Home u otra pantalla según el rol
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Registro de Usuario</Text>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      {/* Podrías agregar un selector para elegir el rol si fuera necesario */}
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
