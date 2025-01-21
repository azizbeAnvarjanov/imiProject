// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt9GL20JQEWLoyQx40eFh9J0vKF256a4o",
  authDomain: "auth-5ba4e.firebaseapp.com",
  projectId: "auth-5ba4e",
  storageBucket: "auth-5ba4e.appspot.com",
  messagingSenderId: "409745845310",
  appId: "1:409745845310:web:9593007ea1e0b2a86e356f",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
