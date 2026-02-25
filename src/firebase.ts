import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Added Firestore for permanent storage

const firebaseConfig = {
  apiKey: "AIzaSyBEy8NsBv1vXGqUS6KHFxCtVKwN7cuqo20",
  authDomain: "himgiri-pickles.firebaseapp.com",
  projectId: "himgiri-pickles",
  storageBucket: "himgiri-pickles.firebasestorage.app",
  messagingSenderId: "1061053100465",
  appId: "1:1061053100465:web:cdaba94651f99d6da0cd90",
  measurementId: "G-QKKRVSDBER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Firestore database to use across your website
export const db = getFirestore(app);