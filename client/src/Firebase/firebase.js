import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmVxj2MPwYrT1EdNvY7q-tVbTUJHtDv8c",
  authDomain: "expenso-990ce.firebaseapp.com",
  projectId: "expenso-990ce",
  storageBucket: "expenso-990ce.firebasestorage.app",
  messagingSenderId: "118242402026",
  appId: "1:118242402026:web:115817a2f39c135b268193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}