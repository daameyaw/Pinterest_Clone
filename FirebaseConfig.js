// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNGGihzKHNGkaRZKICMwiSyPmW_QZpjv8",
  authDomain: "dreamboard-eaa22.firebaseapp.com",
  projectId: "dreamboard-eaa22",
  storageBucket: "dreamboard-eaa22.appspot.com",
  messagingSenderId: "653544587697",
  appId: "1:653544587697:web:935e17ff4c31438d42fd90",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
