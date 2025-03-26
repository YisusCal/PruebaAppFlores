// src/config/firebaseFirestore.js
import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfig"; // Asegúrate de que la ruta sea correcta

const db = getFirestore(app);

export { db };