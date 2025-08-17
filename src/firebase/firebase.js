// src/firebase/config.js

// Import core Firebase services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCYWM4uKWXz1TJACDHGVEXwKIXjXrJoPMs",
  authDomain: "musicals-23ffa.firebaseapp.com",
  projectId: "musicals-23ffa",
  storageBucket: "musicals-23ffa.appspot.com", // ✅ corrected domain
  messagingSenderId: "381547694570",
  appId: "1:381547694570:web:c2d70db7c8c4a519d94a93",
  measurementId: "G-XXM4YD7D8E"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
