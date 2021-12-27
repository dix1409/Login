import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase, ref, onValue, set } from "firebase/database";
// Required for side-effects
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyBi8VDfQchDQJLJNQ_mQO4EqxjfDTIlHJM",
  authDomain: "e-tuts.firebaseapp.com",
  projectId: "e-tuts",
  storageBucket: "e-tuts.appspot.com",
  messagingSenderId: "257278662825",
  appId: "1:257278662825:web:93fd59b2bf6e34bacc71b8",
  measurementId: "G-WP121F1W02",
};
firebase.initializeApp(firebaseConfig);
const db = getDatabase();
export default db;
