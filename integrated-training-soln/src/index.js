// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";

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

export function getCurrentUser() {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const uid = currentUser.uid;
    const email = currentUser.email;
    console.log("Current user:", uid, "\nEmail:", email);
    return email;
  } else {
    console.log("No user currently logged in");
    return "No user";
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
      throw errorMessage;
    });
}

export function loginUser(email, password) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Logged in
          const user = userCredential.user;
          console.log("User logged in:", user);
          return user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Login error:", errorCode, errorMessage);
          throw errorMessage;
        });
    })
    .catch(() => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
      throw errorMessage;
    });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User authenticated:", uid, "\nRedirecting");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2500);
    }
    else {
      console.error("onAuthStateChanged error");
    }
  })
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log("Sign out successful");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign out error:", errorCode, errorMessage);
      throw errorMessage;
    });
}
