// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAkMFMFTc7JWVr_D1tJ58iI7EY2JrYc04Y",
	authDomain: "cps714-g6.firebaseapp.com",
	projectId: "cps714-g6",
	storageBucket: "cps714-g6.appspot.com",
	messagingSenderId: "858056700293",
	appId: "1:858056700293:web:632c9196d90b93243054ec",
	measurementId: "G-YQZQJH7WSJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db };
