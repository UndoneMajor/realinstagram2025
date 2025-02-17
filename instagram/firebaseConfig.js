// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3rilNG2FRm4nm5m-v8c6FXHaHMhAqiq0",
  authDomain: "mkinstagram-57c54.firebaseapp.com",
  projectId: "mkinstagram-57c54",
  storageBucket: "mkinstagram-57c54.firebasestorage.app",
  messagingSenderId: "137780532394",
  appId: "1:137780532394:web:68a0efbb6a81dd18ec6cd3",
  measurementId: "G-FFECYGPDCK",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const signupBase = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signinBase = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
