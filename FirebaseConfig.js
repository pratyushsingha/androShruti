// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCRTDRTRV9gm6eglMIl_2J4Ghay4F5cBUI",
    authDomain: "androshruti-38292.firebaseapp.com",
    projectId: "androshruti-38292",
    storageBucket: "androshruti-38292.appspot.com",
    messagingSenderId: "917026493161",
    appId: "1:917026493161:web:5612915f00418441fe9678",
    measurementId: "G-0Y22GX6EYD"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);