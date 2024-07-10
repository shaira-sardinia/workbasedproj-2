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

    // Redirecting to pages
    if (window.location.pathname.endsWith("dashboard.html")) {
      loadUserCourses();
    }

    if (window.location.pathname.endsWith("catalog.html")) {
      loadCourseCatalog();
    }

    if (window.location.pathname.endsWith("description.html")) {
      loadCourseDescription();
      const searchBar = document.getElementById("search-bar");
      if (searchBar) {
        searchBar.addEventListener("input", filterCourses);
      }
    }
  });
  fetchUsername();
});

/* Fetching and displaying username on navbar */
function fetchUsername() {
  // Example placeholder username, logic here to fetch from database
  const username = "Lisa";

  const usernameElement = document.getElementById("username");
  if (usernameElement) {
    usernameElement.textContent = username;
  }
}

/* Create Course Card for Dashboard and Catalog */
function createCourseCard(course) {
  return card;
}

function viewCourse(courseId) {
  window.location.href = `description.html?courseId=${courseId}`;
}

/* Loading Courses on Dashboard */
async function loadUserCourses() {}

/* Load Course Catalog */
async function loadCourseCatalog() {}

/* Load Course Description */
async function loadCourseDescription() {}

/* Save Course to My Courses */
async function saveToMyCourses(courseId) {}

/* Filter courses using Search Bar  */
function filterCourses() {}
