// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsSKv61qMK0o_GYbdbNhrpR824lqiyL8w",
  authDomain: "travler-app-6e42e.firebaseapp.com",
  projectId: "travler-app-6e42e",
  storageBucket: "travler-app-6e42e.firebasestorage.app",
  messagingSenderId: "401902108587",
  appId: "1:401902108587:web:df235a7e97b28c4da65cee",
  measurementId: "G-SE6R846GTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)