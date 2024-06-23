// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWaYEiz9xsnLyE1lqo2csSDZyi-XRxk2w",
  authDomain: "accenture-training-website.firebaseapp.com",
  databaseURL: "https://accenture-training-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "accenture-training-website",
  storageBucket: "accenture-training-website.appspot.com",
  messagingSenderId: "281533185330",
  appId: "1:281533185330:web:025c8d538a16b68c492b2b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

async function addCity() {
  try {
    await setDoc(doc(firestore, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("User signed up:", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
      return null;
    });
}

// signInWithEmailAndPassword(auth, email, password)
// .then((userCredential) => {
//   // Signed in
//   const user = userCredential.user;
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });
