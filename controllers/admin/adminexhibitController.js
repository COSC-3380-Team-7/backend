const exhibits = [
  {
    id: "EX001",
    name: "Rainforest Exhibit",
    location: "Top",
    department: "Rainforest",
  },
  {
    id: "EX002",
    name: "Savanna Exhibit",
    location: "Left side",
    department: "Savanna",
  },
  {
    id: "EX003",
    name: "Desert Exhibit",
    location: "Right",
    department: "Desert",
  },
]; // This should be replaced with a database call to get the exhibits

const habitats = [
  { id: "H001", exhibitId: "EX001", name: "Tropical Birds Habitat" },
  { id: "H002", exhibitId: "EX001", name: "Monkey Habitat" },
  { id: "H003", exhibitId: "EX002", name: "Lion Den" },
  { id: "H004", exhibitId: "EX002", name: "Elephant Grounds" },
  { id: "H005", exhibitId: "EX003", name: "Snake Pit" },
  { id: "H006", exhibitId: "EX003", name: "Cactus Garden" },
]; // Replace with a database call to get habitats

// Get all exhibits /admin/exhibit
const getAllExhibits = (req, res) => {
  // Set the response headers for a JSON response
  res.writeHead(200, { "Content-Type": "application/json" });
  // Send the exhibits as a JSON string
  res.end(JSON.stringify(exhibits));
};

// Create a new exhibit   /admin/exhibit/create
const createExhibit = (req, res) => {
  const newExhibit = req.body; // Assume body parsing is handled
  exhibits.push(newExhibit); // Add to database
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newExhibit));
};

// Get a specific exhibit by ID   /admin/exhibit/exhibitid
const getExhibitById = (req, res) => {
  // Extract the exhibit ID from the request URL
  const exhibitId = req.url.split("/").pop(); // Get the last part of the URL

  const exhibit = exhibits.find((e) => e.id === exhibitId);
  if (!exhibit) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Exhibit not found");
  }

  // Find habitats associated with the exhibit
  const exhibitHabitats = habitats.filter((h) => h.exhibitId === exhibitId);

  // Combine exhibit data with habitats
  const exhibitData = {
    ...exhibit,
    habitats: exhibitHabitats,
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(exhibitData));
};

//Edits a specific exhibit information   /admin/exhibit/exhibitid/edit
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
