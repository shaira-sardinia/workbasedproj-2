import { onRequest } from "firebase-functions/v2/https";
import fetch from "node-fetch";
import functions from "firebase-functions";

// Custom CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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
  if (req.method === "OPTIONS") {
    res.set(corsHeaders);
    return res.status(204).send("");
  }

  const courseId = req.query.courseId;
  if (!courseId) {
    res.set(corsHeaders);
    return res.status(400).send("Course ID is required");
  }

  // Fetch API key from environment configuration
  const apiKeyForFunction1 = functions.config().function1.apikey;

  try {
    const courseDetails = await fetchCourseDetailsFromAPI(courseId, apiKeyForFunction1);
    res.set(corsHeaders);
    res.status(200).json(courseDetails);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.set(corsHeaders);
    res.status(500).send("Error fetching course details");
  }
});

// HTTP Cloud Function to fetch courses
export const fetchCourses = onRequest(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.set(corsHeaders);
    return res.status(204).send("");
  }

  // Fetch API key from environment configuration
  const apiKeyForFunction2 = functions.config().function2.apikey;

  try {
    const response = await fetch("https://paas-api.pluralsight.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKeyForFunction2}`,
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
    res.set(corsHeaders);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.set(corsHeaders);
    res.status(500).send("Error fetching courses");
  }
});
