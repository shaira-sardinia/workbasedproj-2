// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWaYEiz9xsnLyE1lqo2csSDZyi-XRxk2w",
  authDomain: "accenture-training-website.firebaseapp.com",
  databaseURL: "https://accenture-training-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "accenture-training-website",
  storageBucket: "accenture-training-website.appspot.com",
  messagingSenderId: "281533185330",
  appId: "1:281533185330:web:025c8d538a16b68c492b2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Add a new document in collection "cities"
await setDoc(doc(firestore, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});