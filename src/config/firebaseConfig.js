// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from "firebase/app";
// Importa initializeAuth y la persistencia para React Native
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyCimLHz74tt9vOi-PUBu4p1DoQk7K6n5vw",
  authDomain: "tienda-plantas-flores.firebaseapp.com",
  projectId: "tienda-plantas-flores",
  storageBucket: "tienda-plantas-flores.firebasestorage.app",
  messagingSenderId: "669883492863",
  appId: "1:669883492863:web:005f617230327bc3735fca",
  measurementId: "G-ZJWS3HJW1V"
};

// Inicializa Firebase
const app = initializeApp(FirebaseConfig);

// Inicializa Firebase Auth con persistencia en AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app); // 🔥 Conexión a Firestore
// Si solo estás desarrollando para React Native, puedes omitir Analytics.
// const analytics = getAnalytics(app);

export { auth, db };