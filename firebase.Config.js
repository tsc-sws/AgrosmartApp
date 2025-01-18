// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYq1_Rd-4QUqiQwLbHfZ6nYtdZxLtWP_g",
  authDomain: "smartagroapp-901ec.firebaseapp.com",
  projectId: "smartagroapp-901ec",
  storageBucket: "smartagroapp-901ec.appspot.com",
  messagingSenderId: "483327108816",
  appId: "1:483327108816:web:4434619b9e0dd9a18de0d5",
  measurementId: "G-NVBY5L2MDC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
// Initialize Firebase Auth with AsyncStorage for persistence
/*
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
*/

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
