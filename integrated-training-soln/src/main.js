"use strict";

import { loginUser, registerUser } from "./index.js";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM fully loaded and parsed");

  // Event listener for the Sign Up button click
  const signUpButton = document.getElementById("signUpButton");
  if (signUpButton) {
    signUpButton.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("Sign Up button clicked");

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
        console.error("Error during registration:", error);
        errorMessageDiv.textContent = error; // Display error message
      }
    });
  }

  // Event listener for the Sign Up button click
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("Log In button clicked");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessageDiv = document.getElementById("errorMessage");

      errorMessageDiv.textContent = "";
      errorMessageDiv.style.display = "none";

      try {
        const user = await loginUser(email, password);
        console.log("Login successful:", user);
        window.location.href = "dashboard.html"; // Redirect on success
      } catch (error) {
        console.error("Error during login:", error);
        errorMessageDiv.textContent = error; // Display error message
      }
    });
  }

  // Fetching and displaying username on navbar
  fetchUsername();

  // Redirecting to pages based on current URL
  if (window.location.pathname.endsWith("dashboard.html")) {
    loadUserCourses();
  } else if (window.location.pathname.endsWith("catalog.html")) {
    loadMockCourseCatalog();
    console.log("Calling loadMockCourseCatalog function here");
  } else if (window.location.pathname.endsWith("description.html")) {
    loadCourseDescription();
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.addEventListener("input", filterCourses);
    } else {
      console.error("Search bar element not found.");
    }
  }
});

function fetchUsername() {
  // Example placeholder username, logic here to fetch from database
  const username = "Lisa";
  const usernameElement = document.getElementById("username");
  if (usernameElement) {
    usernameElement.textContent = username;
  }
}

function createCourseCard(course) {
  const template = document.getElementById("course-card-template");
  if (!template) {
    console.error("Template element not found");
    return;
  }
  const card = template.content.cloneNode(true);

  // Selecting elements inside the card
  const img = card.querySelector(".card-img-top");
  const title = card.querySelector(".card-title");
  const description = card.querySelector(".card-text");
  const link = card.querySelector(".btn.custom-btn");

  img.src = course.image || "../images/defaultImage.jpg";
  img.alt = course.title;
  title.textContent = course.title;
  description.textContent = course.description;
  link.href = `description.html?courseId=${course.id}`;

  card.querySelector(".col.course-card").dataset.courseId = course.id; // Example dataset usage

  // Filtering courses using search bar
  card.querySelector(".col.course-card").dataset.title = course.title.toLowerCase();

  return card;
}

function viewCourse(courseId) {
  window.location.href = `description.html?courseId=${courseId}`;
}

async function loadUserCourses() {
  // Implementation here
}

async function loadCourseCatalog() {
  // Implementation here
}

async function loadCourseDescription() {
  // Implementation here
}

async function saveToMyCourses(courseId) {
  // Implementation here
}

function filterCourses() {
  // Implementation here
}

function loadMockCourseCatalog() {
  console.log("Inside loadMockCourseCatalog function");
  const mockData = {
    courses: [
      {
        id: 1,
        image: "https://via.placeholder.com/150",
        title: "Course 1",
        description: "This is the description for Course 1.",
      },
      {
        id: 2,
        image: "https://via.placeholder.com/150",
        title: "Course 2",
        description: "This is the description for Course 2.",
      },
      {
        id: 3,
        image: "https://via.placeholder.com/150",
        title: "Course 3",
        description: "This is the description for Course 3.",
      },
    ],
  };
  const catalogContainer = document.getElementById("catalog-section");
  if (!catalogContainer) {
    console.error("Catalog section not found");
    return;
  }
  catalogContainer.innerHTML = "";

  mockData.courses.forEach((course) => {
    const courseCard = createCourseCard(course);
    catalogContainer.appendChild(courseCard);
  });
}
