"use strict";

import { registerUser } from "./index.js";

//Log in
//Sign up

/* Event listener for the authentication form submission during log in */
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Event listener for the Log In button click
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Log In button clicked");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessageDiv = document.getElementById("errorMessage");

    errorMessageDiv.textContent = "";
    errorMessageDiv.style.display = "none";

    try {
      const user = await registerUser(email, password);
      console.log("Registration successful:", user);
      window.location.href = "dashboard.html"; // Redirect on success
    } catch (error) {
      console.error("Error during logging in:", error);
      errorMessageDiv.textContent = error; // Display error message
    }
  });
});

/* Loading footer content */
function loadFooter() {
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    fetch("./util/footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerContainer.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error fetching footer:", error);
      });
  } else {
    console.error("Footer container not found.");
  }

  console.log("Footer Container:", footerContainer);
}

/* Loading navbar content */
function loadNavbar() {
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("./util/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarContainer.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error fetching navbar:", error);
      });
  } else {
    console.error("Navbar container not found.");
  }

  console.log("Navbar Container:", navbarContainer);
}

/* Fetching and displaying username on navbar */
function fetchUsername() {
  // Example placeholder username, logic here to fetch from database
  const username = "Lisa";

  const usernameElement = document.getElementById("username");
  if (usernameElement) {
    usernameElement.textContent = username;
  }
}

/* Executing functions on DOM content loaded */
document.addEventListener("DOMContentLoaded", function () {
  loadFooter();
  loadNavbar();
  fetchUsername();
});
