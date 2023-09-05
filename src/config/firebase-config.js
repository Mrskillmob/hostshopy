import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyDlX9aLfwcgs-7Cj2DawmaQtEJrYn92Io0",
  authDomain: "shopy-stranka.firebaseapp.com",
  projectId: "shopy-stranka",
  storageBucket: "shopy-stranka.appspot.com",
  messagingSenderId: "604166320938",
  appId: "1:604166320938:web:d5dca808605c474e11e453",
  measurementId: "G-7F646G5SB4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, googleProvider, db, storage }
