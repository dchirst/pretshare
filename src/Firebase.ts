// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.REACT_APP_API_KEY}`,
  authDomain: "pretshare.firebaseapp.com",
  projectId: "pretshare",
  storageBucket: "pretshare.appspot.com",
  messagingSenderId: "117613716811",
  appId: "1:117613716811:web:f48141725391b55fe974ce",
  measurementId: "G-3064F5EE14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db