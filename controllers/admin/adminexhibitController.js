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
  {
    id: "H001",
    exhibitId: "EX001",
    name: "Tropical Birds Habitat",
    description: "A habitat for tropical birds.",
  },
  {
    id: "H002",
    exhibitId: "EX001",
    name: "Monkey Habitat",
    description: "A playful habitat for monkeys.",
  },
  {
    id: "H003",
    exhibitId: "EX002",
    name: "Lion Den",
    description: "The king's territory.",
  },
  {
    id: "H004",
    exhibitId: "EX002",
    name: "Elephant Grounds",
    description: "A vast area for elephants.",
  },
  {
    id: "H005",
    exhibitId: "EX003",
    name: "Snake Pit",
    description: "A rocky pit for snakes.",
  },
  {
    id: "H006",
    exhibitId: "EX003",
    name: "Cactus Garden",
    description: "A desert garden with cacti.",
  },
];

const animalsInHabitats = {
  H001: [
    { animalId: "An001", name: "Parrot", location: "A23", department: "Birds" },
    { animalId: "An002", name: "Toucan", location: "A24", department: "Birds" },
  ],
  H002: [
    {
      animalId: "An003",
      name: "Chimpanzee",
      location: "B15",
      department: "Primates",
    },
  ],
  // Add other habitats as needed
};

function getExhibitId(url) {
  const match = url.match(/\/admin\/exhibit\/([^/]+)/);
  return match ? match[1] : null;
}

function getHabitatId(url) {
  const match = url.match(/\/admin\/exhibit\/[^/]+\/habitat\/([^/]+)/);
  return match ? match[1] : null;
}

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

/// Get a specific exhibit by ID   /admin/exhibit/exhibitid
const getExhibitById = (req, res) => {
  // Extract the exhibit ID from the URL using regex
  const match = req.url.match(/\/admin\/exhibit\/([^/]+)/);
  const exhibitId = match ? match[1] : null;

  if (!exhibitId) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Invalid exhibit ID");
  }

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

function createHabitat(req, res) {
  const exhibitId = getExhibitId(req.url);
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const newHabitatData = JSON.parse(body);
      const newHabitat = {
        id: `H${habitats.length + 1}`, // Generate new ID
        exhibitId: exhibitId,
        name: newHabitatData.name || "New Habitat",
        description: newHabitatData.description || "Description not provided",
      };
      habitats.push(newHabitat);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newHabitat));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON format");
    }
  });
}

function getAnimalsInHabitat(req, res) {
  const habitatId = getHabitatId(req.url);
  const animals = animalsInHabitats[habitatId] || [];

  let response = `Animals in Habitat ${habitatId}:\n`;
  animals.forEach((animal) => {
    response += `Animal ID: ${animal.animalId}, Name: ${animal.name}, Location: ${animal.location}, Department: ${animal.department}\n`;
  });

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(response);
}

function editHabitat(req, res) {
  const habitatId = getHabitatId(req.url);
  const habitat = habitats.find((h) => h.id === habitatId);

  if (!habitat) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Habitat not found");
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const updatedData = JSON.parse(body);
      habitat.name = updatedData.name || habitat.name;
      habitat.description = updatedData.description || habitat.description;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(habitat));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON format");
    }
  });
}

module.exports = {
  getAllExhibits,
  createExhibit,
  getExhibitById,
  updateExhibit,
  createHabitat,
  getAnimalsInHabitat,
  editHabitat,
};
