// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6fzkpg2ZjaHqM-_EFCxE2KsCY4qZ5hYo",
    authDomain: "next-auth-app-3658f.firebaseapp.com",
    projectId: "next-auth-app-3658f",
    storageBucket: "next-auth-app-3658f.appspot.com",
    messagingSenderId: "177053673310",
    appId: "1:177053673310:web:7e70eecf9707a6d99351cf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
