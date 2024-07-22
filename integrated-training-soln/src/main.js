"use strict";

import { loginUser, registerUser } from "./index.js";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/Logo.png";
import about from "./images/AboutImage.jpg";
import placeholder from "./images/placeholderImg.svg";

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

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM fully loaded and parsed");

  function handleFormSubmission(action) {
    return async function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessageDiv = document.getElementById("errorMessage");

      errorMessageDiv.textContent = "";
      errorMessageDiv.style.display = "none";

      try {
        let user;
        if (action === "register") {
          user = await registerUser(email, password);
          console.log("Registration successful:", user);
        } else if (action === "login") {
          user = await loginUser(email, password);
          console.log("Login successful:", user);
        }
      } catch (error) {
        console.error(`Error during ${action}:`, error);
        errorMessageDiv.textContent = error; // Display error message
        errorMessageDiv.style.display = "block";
      }
    };
  }

  const signUpButton = document.getElementById("signUpButton");
  if (signUpButton) {
    console.log("Attaching event listener to Sign Up button");
    signUpButton.addEventListener("click", handleFormSubmission("register"));
  }

  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    console.log("Attaching event listener to Log In button");
    loginButton.addEventListener("click", handleFormSubmission("login"));
  }

  // Fetching and displaying username on navbar
  fetchUsername();

  // Redirecting to pages based on current URL
  if (window.location.pathname.endsWith("dashboard.html")) {
    loadUserCourses();
    console.log("Calling loadUserCourses function here");
  } else if (window.location.pathname.endsWith("catalog.html")) {
    loadCourseCatalog();
    console.log("Calling loadCourseCatalog function here");
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

/* Generate dynamic content for course cards  */
function createCourseCard(course) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-4");

  card.innerHTML = `
    <div class="card">
      <img src="${course.image}" class="card-img-top" alt="Course Image" />
      <div class="card-body">
        <h5 class="card-title">${course.title}</h5>
        <p class="card-text">${course.description}</p>
        <a href="#" class="btn custom-btn course-link" data-course-id="${course.id}">Learn More</a>
      </div>
    </div>
  `;

  const learnMoreLink = card.querySelector(".course-link");
  learnMoreLink.addEventListener("click", function (event) {
    event.preventDefault();
    const courseId = learnMoreLink.dataset.courseId;
    viewCourse(courseId);
  });

  return card;
}

async function viewCourse(courseId) {
  try {
    const courseDetails = await fetchCourseDetails(courseId);
    const url = `description.html?courseId=${courseDetails.id}`;
    window.location.href = url;
  } catch (error) {
    console.error(error);
  }
}

// async function loadCourseDescription() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const courseId = urlParams.get("courseId");

//   try {
//     const course = await fetchCourseDetails(courseId); // API call here
//     renderCourseDetails(course);
//   } catch (error) {
//     console.error("Error loading course description:", error);
//   }
// }

function renderCourseDetails(course) {
  const courseNameElement = document.querySelector(".header-text");
  const courseDescriptionElement = document.querySelector(".col-7 p");
  const courseImageElement = document.querySelector(".col-5 img");
  const courseSubtextElement = document.querySelector(".desc-text p");

  if (courseNameElement) {
    courseNameElement.textContent = course.title;
  }
  if (courseDescriptionElement) {
    courseDescriptionElement.textContent = course.description;
  }
  if (courseImageElement) {
    courseImageElement.src = course.image;
    courseImageElement.alt = course.title;
  }
  if (courseSubtextElement) {
    courseSubtextElement.textContent = course.subtitle;
  }
}

async function loadUserCourses() {
  // Implementation here
}

async function loadCourseCatalog() {
  console.log("Inside course catalog");
  try {
    const courses = await fetchCourses();
    const catalogContainer = document.getElementById("catalog-section");
    if (!catalogContainer) {
      console.error("Catalog section not found");
      return;
    }
    catalogContainer.innerHTML = "";
    courses.forEach((course) => {
      const courseCard = createCourseCard(course);
      catalogContainer.appendChild(courseCard);
    });
  } catch (error) {
    console.error("Error loading course catalog:", error);
  }
}

async function saveToMyCourses(courseId) {
  // Implementation here
}

function filterCourses() {
  // Implementation here
}

// function loadMockCourseCatalog() {
//   console.log("Inside loadMockCourseCatalog function");
//   const catalogContainer = document.getElementById("catalog-section");
//   if (!catalogContainer) {
//     console.error("Catalog section not found");
//     return;
//   }
//   catalogContainer.innerHTML = "";

//   mockData.courses.forEach((course) => {
//     const courseCard = createCourseCard(course);
//     catalogContainer.appendChild(courseCard);
//   });
// }

/* API calls  */
async function fetchCourses() {
  try {
    const response = await fetch("https://us-central1-accenture-training-website.cloudfunctions.net/fetchCourses", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const courses = await response.json();

    const container = document.getElementById("courses-container");

    courses.forEach((course) => {
      const courseCard = createCourseCard(course);
      container.appendChild(courseCard);
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

async function fetchCourseDetails(courseId) {
  console.log(`Fetching course details for courseId: ${courseId}`);
  try {
    const response = await fetch(
      `https://us-central1-accenture-training-website.cloudfunctions.net/fetchCourseDetails?courseId=${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
}

// console.log("mockData:", mockData);

// return new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const course = mockData.courses.find((course) => course.id === courseId);
//     if (!course) {
//       const errorMessage = `Course details not found for courseId: ${courseId}`;
//       console.error(errorMessage);
//       reject(new Error(errorMessage));
//     } else {
//       console.log(`Course details found for courseId ${courseId}:`, course);
//       resolve(course);
//     }
//   }, 5000); // Simulate 1 second delay (remove in real API implementation)
// });
