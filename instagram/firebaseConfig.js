import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeq_-ecz3NQgBKFuFJpOGgSzQsZdMdaEg",
  authDomain: "instagrammer-be66f.firebaseapp.com",
  projectId: "instagrammer-be66f",
  storageBucket: "instagrammer-be66f.appspot.com",
  messagingSenderId: "674248045972",
  appId: "1:674248045972:web:45156e2ef54d41d7ca0b81",
  measurementId: "G-R3BX1KW8BK"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export const signupBase = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signinBase = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export { auth, db };
