// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiO-ow10wQbqZ1AeymQfd9WFyvdYkygSc",
  authDomain: "realter-deaac.firebaseapp.com",
  projectId: "realter-deaac",
  storageBucket: "realter-deaac.appspot.com",
  messagingSenderId: "883700839649",
  appId: "1:883700839649:web:b8c7e856eec8ae893533a0",
  measurementId: "G-HRBHXDHE93",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
