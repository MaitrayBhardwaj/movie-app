import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3h9GB7AKSl657X5WSOyYmUB9L7vcoDnA",
  authDomain: "cinematic-fc89f.firebaseapp.com",
  projectId: "cinematic-fc89f",
  storageBucket: "cinematic-fc89f.appspot.com",
  messagingSenderId: "1073816025049",
  appId: "1:1073816025049:web:9d948a12ee6bdc4677cbc8"
};

export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);