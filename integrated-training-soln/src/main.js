"use strict";

import { registerUser } from "./index.js";

document.getElementById("authForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessageDiv = document.getElementById("errorMessage");

  errorMessageDiv.textContent = "";

  /* If user is successful, page redirects to Dashboard, otherwise, display error message in DOM */
  try {
    const user = await registerUser(email, password);
    console.log("Registration successful:", user);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Error during logging in:", error);
    errorMessageDiv.textContent = error;
  }
});
