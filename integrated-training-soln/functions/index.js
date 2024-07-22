import { onRequest } from "firebase-functions/v2/https";
import cors from "cors";
import fetch from "node-fetch";
import functions from "firebase-functions";

// Initialize CORS with proper settings
const corsHandler = cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
});

// Function to fetch course details from PluralSight API
async function fetchCourseDetailsFromAPI(courseId, apiKey) {
  const apiUrl = `https://paas-api.pluralsight.com/graphql`;

  const query = {
    query: `
    query {
      channelContent {
        nodes {
          id
          title
          description
          image
        }
      }
    }
    `,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

// HTTP Cloud Function to fetch course details
export const fetchCourseDetails = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const courseId = req.query.courseId;
    if (!courseId) {
      return res.status(400).send("Course ID is required");
    }

    const apiKey = functions.config().pluralsight.fetch_course_details_key;

    try {
      const courseDetails = await fetchCourseDetailsFromAPI(courseId, apiKey);
      res.status(200).json(courseDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
      res.status(500).send("Error fetching course details");
    }
  });
});

// HTTP Cloud Function to fetch courses
export const fetchCourses = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const apiKey = functions.config().pluralsight.fetch_courses_key;

    try {
      const response = await fetch("https://paas-api.pluralsight.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          query: `
          query {
            courseCatalog {
              nodes {
                id
                title
                description
                image
              }
            }
          }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).send("Error fetching courses");
    }
  });
});
