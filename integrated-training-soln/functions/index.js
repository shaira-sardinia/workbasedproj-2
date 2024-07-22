import { onRequest } from "firebase-functions/v2/https";
import cors from "cors";
import fetch from "node-fetch";
import functions from "firebase-functions";

// Initialize CORS with proper settings
const corsHandler = cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Function to fetch course details from PluralSight API
async function fetchCourseDetailsFromAPI(courseId, apiKey) {
  const apiUrl = `https://paas-api.pluralsight.com/graphql`;

  const query = {
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

  const result = await response.json();
  return result.data.courseCatalog.nodes;
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

// export const fetchCourses = onRequest(async (req, res) => {
//   corsHandler(req, res, async () => {
//     const apiKey = functions.config().pluralsight.fetch_courses_key;

//     try {
//       const response = await fetch("https://paas-api.pluralsight.com/graphql", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           query: `
//           query {
//             courseCatalog {
//               nodes {
//                 id
//                 title
//                 description
//                 image
//               }
//             }
//           }
//           `,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       res.status(200).json(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       res.status(500).send("Error fetching courses");
//     }
//   });
// });

export const fetchCourses = onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method === "OPTIONS") {
      // Preflight request
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(204).send("");
    }

    const apiKey = functions.config().function1.apikey;

    try {
      const courses = await fetchCoursesFromAPI(apiKey);
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).send("Error fetching courses");
    }
  });
});
