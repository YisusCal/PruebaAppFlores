import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useFavoritos } from "../context/FavoritosContext"; // Usamos el contexto de favoritos

const FavoritosScreen = () => {
  const { favoritos, toggleFavorito } = useFavoritos(); // Usamos el contexto de favoritos

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Mis Favoritos</Text>
      
      {favoritos.length === 0 ? (
        <Text style={{ fontSize: 18, color: "gray" }}>No tienes flores favoritas aún.</Text> // Estilo mejorado
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginBottom: 15, padding: 10, borderWidth: 1 }}>
              {item.foto && (
                <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
              )}
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nombre}</Text>
              <Text>Precio: ${item.precio}</Text>

              {/* 💔 Botón para quitar de favoritos */}
              <TouchableOpacity onPress={() => toggleFavorito(item)}>
                <Text style={{ fontSize: 20, color: "red" }}>💔 Quitar de Favoritos</Text> {/* Estilo mejorado */}
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default FavoritosScreen;
