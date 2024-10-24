const exhibits = [
  {
    id: "EX001",
    name: "Rainforest Exhibit",
    description: "A beautiful exhibit showcasing rainforest animals.",
  },
  {
    id: "EX002",
    name: "Savanna Exhibit",
    description: "Home to various African animals.",
  },
  {
    id: "EX003",
    name: "Desert Exhibit",
    description: "An exhibit featuring desert wildlife.",
  },
]; // This should be replaced with a database call to get the exhibits

// Get all exhibits
const getAllExhibits = (req, res) => {
  // Set the response headers for a JSON response
  res.writeHead(200, { "Content-Type": "application/json" });
  // Send the exhibits as a JSON string
  res.end(JSON.stringify(exhibits));
};

// Create a new exhibit
const createExhibit = (req, res) => {
  const newExhibit = req.body; // Assume body parsing is handled
  exhibits.push(newExhibit); // Add to database
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newExhibit));
};

// Get a specific exhibit by ID
const getExhibitById = (req, res) => {
  // Extract the exhibit ID from the request URL
  const exhibitId = req.url.split("/").pop(); // Get the last part of the URL

  const exhibit = exhibits.find((e) => e.id === exhibitId);
  if (!exhibit) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Exhibit not found");
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(exhibit));
};

const updateExhibit = (req, res) => {
  // Extract the exhibit ID from the URL
  const urlParts = req.url.split("/");
  const exhibitId = urlParts[urlParts.length - 2]; // Get the second last part of the URL

  let exhibit = exhibits.find((e) => e.id === exhibitId);

  // Check if the exhibit exists
  if (!exhibit) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Exhibit not found");
  }

  // Handle the request body
  let body = "";

  // Collect data from the request body
  req.on("data", (chunk) => {
    body += chunk.toString(); // Convert Buffer to string
  });

  req.on("end", () => {
    // Assume body is in JSON format
    try {
      const updatedData = JSON.parse(body);
      exhibit = { ...exhibit, ...updatedData }; // Merge with updated data

      // Respond with the updated exhibit
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(exhibit));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON");
    }
  });
};

module.exports = {
  getAllExhibits,
  createExhibit,
  getExhibitById,
  updateExhibit,
};
