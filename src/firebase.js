// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP7cMAvhyN0XflLERgQRCYi8nVQBdxqI4",
  authDomain: "estate-app-4c2ee.firebaseapp.com",
  projectId: "estate-app-4c2ee",
  storageBucket: "estate-app-4c2ee.appspot.com",
  messagingSenderId: "969799075219",
  appId: "1:969799075219:web:aac730c85c75f2c9655466",
  measurementId: "G-BHWPLLRET2"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);