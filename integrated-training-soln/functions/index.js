import * as functions from "firebase-functions";
import fetch from "node-fetch";
// const corsHandler = cors({ origin: true });

// Function to fetch course details from PluralSight API
async function fetchCourseDetailsFromAPI(courseId, apiKey) {
  const apiUrl = `https://paas-api.pluralsight.com/graphql`;

  const query = {
    query: `
      query {
        courseCatalog(first: 3) {
            nodes {
            id
            idNum
            slug
            url
            title
            level
            description
            shortDescription
            }
  }
}
    `,
  };

  console.log("API URL:", apiUrl);
  console.log("Using API Key:", apiKey);

  const response = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(query),
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response text:", errorText);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  console.log("Response data:", responseData);
  return responseData;
}

// HTTP Cloud Function
export const fetchCourseDetails = functions.https.onRequest(async (req, res) => {
  const courseId = req.query.courseId;
  if (!courseId) {
    return res.status(400).send("Course ID is required");
  }

  // Access the API key from Firebase environment configuration
  const apiKey = functions.config().pluralsight.api_key;

  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    const courseDetails = await fetchCourseDetailsFromAPI(courseId, apiKey);
    res.status(200).json(courseDetails);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).send("Error fetching course details");
  }
});
