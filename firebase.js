// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_nOvdy2KxEUWlZZGQV5J1kpmb10gxtbE",
  authDomain: "food-bridge-cfd44.firebaseapp.com",
  projectId: "food-bridge-cfd44",
  storageBucket: "food-bridge-cfd44.appspot.com",
  messagingSenderId: "429712442013",
  appId: "1:429712442013:web:b2c28e68e8f66f32ea8a74",
  measurementId: "G-Z1QR5GL8LW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { firestore, auth, storage };
