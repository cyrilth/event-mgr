// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "event-mgr-v1.firebaseapp.com",
  projectId: "event-mgr-v1",
  storageBucket: "event-mgr-v1.firebasestorage.app",
  messagingSenderId: "711787956824",
  appId: "1:711787956824:web:a5f7fc879881601eb4982d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
