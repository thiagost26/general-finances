import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';



let firebaseConfig = {
  apiKey: "AIzaSyAUMwEu7sQGpQAJHz4EiZM2elLjYntXnck",
  authDomain: "general-302ea.firebaseapp.com",
  projectId: "general-302ea",
  storageBucket: "general-302ea.appspot.com",
  messagingSenderId: "28360288245",
  appId: "1:28360288245:web:3a869d1fb607dceb2ee2bc",
  measurementId: "G-S7JHB72EQ2"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;