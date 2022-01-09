import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, set } from "firebase/database"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Required for side-effects
require("firebase/firestore")
const firebaseConfig = {
  apiKey: "AIzaSyBi8VDfQchDQJLJNQ_mQO4EqxjfDTIlHJM",
  authDomain: "e-tuts.firebaseapp.com",
  projectId: "e-tuts",
  storageBucket: "e-tuts.appspot.com",
  messagingSenderId: "257278662825",
  appId: "1:257278662825:web:93fd59b2bf6e34bacc71b8",
  measurementId: "G-WP121F1W02",
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)
export { db, auth }
