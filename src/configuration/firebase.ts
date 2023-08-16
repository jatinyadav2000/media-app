// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwcdtpaP7YFNUSaf06pvKwy_0HtYyvlOA",
  authDomain: "react-media-433e5.firebaseapp.com",
  projectId: "react-media-433e5",
  storageBucket: "react-media-433e5.appspot.com",
  messagingSenderId: "927920603438",
  appId: "1:927920603438:web:f9e09be802b0c18564babf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth (app) ;
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);