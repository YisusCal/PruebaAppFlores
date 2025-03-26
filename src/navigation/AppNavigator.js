import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen"; // Lo crearemos después
import AdminHome from "../screens/AdminHomeScreen";
import ClienteHome from "../screens/ClienteHomeScreen";
import AdminFlores from "../screens/AdminFlores";
import AgregarFlor from "../screens/AgregarFlor";
import EditarFlor from "../screens/EditarFlor";
import ClienteFlores from "../screens/ClienteFlores";
import CarritoScreen from "../screens/CarritoScreen";
import { CarritoProvider } from "../context/CarritoContext";
import FlorDetalles from "../screens/FlorDetalles";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <CarritoProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Oculta el header en el login
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminHome" 
          component={AdminHome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ClienteHome" 
          component={ClienteHome} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminFlores" 
          component={AdminFlores} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AgregarFlor" 
          component={AgregarFlor} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EditarFlor" 
          component={EditarFlor} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ClienteFlores" 
          component={ClienteFlores} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CarritoScreen" 
          component={CarritoScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="FlorDetalles" 
          component={FlorDetalles} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      </NavigationContainer>
    </CarritoProvider>
  );
};

export default AppNavigator;