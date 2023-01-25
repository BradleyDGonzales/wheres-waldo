// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzXYJzKTU8zU_mwOGeDsxCyeY6A_20908",
  authDomain: "wheres-waldo-729e3.firebaseapp.com",
  projectId: "wheres-waldo-729e3",
  storageBucket: "wheres-waldo-729e3.appspot.com",
  messagingSenderId: "699095488319",
  appId: "1:699095488319:web:6d78f0c39e02601b13658a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)