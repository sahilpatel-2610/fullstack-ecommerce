// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (Hardcoded for Admin Fix)
const firebaseConfig = {
    apiKey: "AIzaSyAGLgTwflzpacwRhmrPut_qJMQIINXuPe8",
    authDomain: "fullstack-ecommerce-add0d.firebaseapp.com",
    projectId: "fullstack-ecommerce-add0d",
    storageBucket: "fullstack-ecommerce-add0d.firebasestorage.app",
    messagingSenderId: "79865000534",
    appId: "1:79865000534:web:76f8ca49041cd75a27c1f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
