import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvLjQ0rx10Mg0mTMhQ_mMjvmUiSA4je3A",
  authDomain: "primetechsolutions-9351e.firebaseapp.com",
  projectId: "primetechsolutions-9351e",
  storageBucket: "primetechsolutions-9351e.firebasestorage.app",
  messagingSenderId: "25609702210",
  appId: "1:25609702210:web:b144d99779e70e4e0b96db",
  measurementId: "G-FKBDDHM0QY"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };